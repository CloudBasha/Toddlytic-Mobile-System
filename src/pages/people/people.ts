import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, ModalController} from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http'; 
import { GlobalProvider } from '../../providers/global/global';
import * as clone from 'clone';
import { TabsPage } from '../tabs/tabs';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-people',
  templateUrl: 'people.html',
})
export class PeoplePage {

  debug : boolean = true;
  public sessionData : any;
  public students : any;
  public temp : any;
  public active : any;
  public programs : any;
  public menuAndMeals : any;
  public programsOrdered : any;
  public showHeader : boolean = false;
  public showNames : boolean = false;
  public unselect : boolean = false; 
  public response : any;
  public selected : any;
  submitActivityObj = {
    trackingType : '',
    studentId : '',
    mealId: '',
    menuId: '',
    quantity: '',
    unit: '',
    value: '',
    remark: '',
    complete_status: '',
    temperature: '',
    rashes: false,
    mouth_ulcer: false,
    blister: '',
    drooling_saliva: false,
    red_watery_eyes: false,
    cough: false,
    runny_nose: false,
    virus: false,
    start_time: '',
    end_time: '',
    contactEmail: this.global.SessionData.userEmail
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private global : GlobalProvider, private httpProvider : HttpProvider, private alert : AlertController, 
    private tabs : TabsPage, public events : Events, public modal : ModalController) {
    this.sessionData = this.global.SessionData;

    events.subscribe('Student:Attendance', () => {
      this.attendance();
    });
    events.subscribe('Student:Hygiene', () => {
      this.hygiene();
    });
    events.subscribe('Student:Medication', () => {
      this.medication();
    });
    events.subscribe('Student:Meal', () => {
      this.meal();
    });
    events.subscribe('Student:Health', () => {
      this.health();
    });
    events.subscribe('Student:Sleep', () => {
      this.sleepStart();
    });
    events.subscribe('Student:Close', () => {
      this.closeHeader();
    });
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad PeoplePage'); 
    this.getStudentList();
    this.getProgramList();
    this.selected = [];
  }

  select(index){
    this.showHeader = true;
    this.tabs.HideTabsHeader = true;
    this.students[index].selected = !this.students[index].selected;
    this.selected.push(this.students[index].student.studentId);
  }

  closeHeader(){ 
    this.showHeader = false;
    this.tabs.HideTabsHeader = false;
    this.selected = [];
  }

  unselected(){
    this.unselect = !this.unselect;
    this.students.forEach(student => {
      student.selected = this.unselect;
      if(this.unselect) this.selected.push(student.student.studentId);
    });
    if(!this.unselect) {
      this.selected = [];
      this.tabs.HideTabsHeader = false;
    }
  }

  submitActivity(submitActivityObj){
    
    let activityArray = [this.selected.length];
    let postActivityObj = {
      tracking_list : activityArray
    };

    for(let i=0;i<this.selected.length;i++){
      activityArray[i] = clone(submitActivityObj);
      activityArray[i].studentId = this.selected[i].toString();
    }
    
    console.log("post data2", JSON.stringify(postActivityObj));
    this.closeHeader();
    
    this.httpProvider.getdata("app/c_tracking_list/", postActivityObj)
    .then(data =>{
      this.response = data;
      if(this.response.status=='Success')
        this.global.presentToast("Saved");
      else {
        this.global.presentToast("Failed to save");
        console.log("data", JSON.stringify(data));
      }
    }, (error) => {
      console.log("error",JSON.stringify(error));
      console.log("post data", JSON.stringify(postActivityObj));
    });
    
  }

  completeHealth(i){
    const menuModal = this.modal.create(MenuPage, this.students[i].student);
    if(!this.showHeader) menuModal.present();
    console.log('Meal opened!');
  }

  sleepStart(){
    let copyObj = this.submitActivityObj;
    let start = {
      message : "Gone to Bed?",
      text : "Start"
    }

    let stop = {
      message : "Woke up?",
      text : "Stop"
    }
    //start = (state) ? start : stop;


    let alert = this.alert.create({
      title: 'Sleepometer',
      message: start.message,
      buttons: [
        { text: 'Cancel', role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: start.text,
          handler: data => {
            copyObj.start_time = this.global.getDatestring().toString();
            copyObj.trackingType = "sleep";
            copyObj.value = start.text;
            this.submitActivity(copyObj);
            console.log('OK clicked: ' + data );
          }
        }
      ]
    });
    alert.present();
  }

  health(){
    let copyObj = this.submitActivityObj;
    this.submitActivity(copyObj);
  }
  meal(){
    let copyObj = this.submitActivityObj;
    
    this.submitActivity(copyObj);
  }

  medication(){
    let copyObj = this.submitActivityObj;
    let alert = this.alert.create({
      title: 'Medication check',
      message: 'What do you have today?',
      inputs: [ { name : 'remark' , type: 'text', label: 'Medication', value: ''}],
      buttons: [
        { text: 'Cancel', role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log('OK clicked: ' + data);
            copyObj.remark = data.remark;
            copyObj.start_time = this.global.getDatestring().toString();
            this.submitActivity(copyObj);
          }
        }
      ]
    });
    alert.present();
  }

  hygiene(){
    let copyObj = this.submitActivityObj;
    let alert = this.alert.create({
        title: 'Hygiene check',
        message: 'What did you do today?',
        inputs: [ { type: 'radio', label: 'Bath', value: 'bath'},
          {type: 'radio', label: 'Small Potty', value: 'potty1'},
          {type: 'radio', label: 'Big Potty', value: 'potty2'}
        ],
        buttons: [
          { text: 'Cancel', 
          role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          { 
            text: 'Save',
            handler: data => {
              copyObj.trackingType = data;
              copyObj.start_time = this.global.getDatestring().toString();
              this.submitActivity(copyObj);
              console.log('OK clicked: ' + data );
            }
          }
        ]
      });
      alert.present();
  }

  attendance(){
    let copyObj = this.submitActivityObj;
    let alert = this.alert.create({
      title: 'Attendance',
      message: "What going on?",
      buttons: [
        { text: 'Cancel', 
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Check In',
          cssClass : 'btn-theme',
          role: 'checkin',
          handler: () => {
            copyObj.trackingType = "checkIn";
            copyObj.value = "True";
            copyObj.start_time = this.global.getDatestring();
            this.submitActivity(copyObj);
            console.log('Check In clicked: ');
          }
        },
        {
          text: 'Check Out',
          role: 'checkout',
          handler: () => {
            copyObj.trackingType = "checkOut";
            copyObj.value = "True";
            copyObj.start_time = this.global.getDatestring();
            this.submitActivity(copyObj);
            console.log('Check Out clicked: ');
          }
        }
      ]
    });
    alert.present();
  }

  getStudentList(){
    let organization = {
      orgId : this.sessionData.organizationId
    };

    this.httpProvider.getdata("app/listStudent/", organization)
    .then(data =>{
      this.temp = data;
      this.students = this.temp.studentList;
      this.sortNewsFeed();
      console.log("students",this.students);

    }, (error) => {
      console.log("error",JSON.stringify(error));
    });
  }

  getProgramList(){
  let organization = {
    orgId : this.sessionData.organizationId
  };

  this.httpProvider.getdata("cms/l_program/", organization)
    .then(data =>{
      this.temp = data;
      this.programs = this.temp.list;
      this.programsOrdered = [];
      this.programs.forEach(program => {
        program.programSchool.forEach(programSchool => {
          this.programsOrdered.push(programSchool);
        });
      });
      this.addNonPrograms();
      //console.log("programsOrdered",this.programsOrdered);
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });
  }

  getMenuandMealList(){
    let organization = {
      orgId : this.sessionData.organizationId
    };
    this.httpProvider.getdata("app/l_menu/", organization)
    .then(data =>{
      this.temp = data;
      this.menuAndMeals = this.temp.list;

      //console.log("programsOrdered",this.programsOrdered);
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });
  }

  sortNewsFeed(){
    this.students.sort((a,b) => a.student.name.toString().localeCompare(b.student.name));
    return this.students;
  }

  addNonPrograms(){
    let unEnrolledObj = {
      capacity : null,
      capacityPercentage : null,
      colorCode : null,
      currentEnrolled : null,
      hasStudents  : null,
      program : null,
      programSchoolId : "Unenrolled",
      programSchoolName : "Unenrolled",
      school : null
    }
    let graduatedObj = {
      capacity : null,
      capacityPercentage : null,
      colorCode : null,
      currentEnrolled : null,
      hasStudents  : null,
      program : null,
      programSchoolId : "Graduated",
      programSchoolName : "Graduated",
      school : null
    }

    let freezedObj = {
        capacity : null,
        capacityPercentage : null,
        colorCode : null,
        currentEnrolled : null,
        hasStudents  : null,
        program : null,
        programSchoolId : "Frozen",
        programSchoolName : "Frozen",
        school : null
    }
    //this.programsOrdered.push(graduatedObj);
    //this.programsOrdered.push(freezedObj);
    //this.programsOrdered.push(unEnrolledObj);
  }
 
  checkImg(img){
    if(!img) img = "assets/img/defaultAvatar.jpg";
    return img;
  }

}
