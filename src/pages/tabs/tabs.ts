import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { GlobalProvider } from '../../providers/global/global';
import { HomePage } from '../home/home';
import { SuperTabsController } from 'ionic2-super-tabs';
import { MenuPage } from '../menu/menu';
import { SettingsPage } from '../settings/settings';
import { HttpProvider } from '../../providers/http/http';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {  
  // The tabs pages for only Tabs.html page, with slider
  pages = [
    { pageName: 'NewsfeedPage', title: 'Newsfeed', icon: 'school', id: 'newsTab'},
    //{ pageName: 'CameraPage', title: 'Camera', icon: 'camera', id: 'camearTab'},
    //{ pageName: 'CalendarPage', title: 'Calendar', icon: 'calendar', id: 'calendarTab'},
    { pageName: 'PeoplePage', title: 'People', icon: 'contacts', id: 'peopleTab'}
  ];

  groups = [
    { name : "", },
  ];

  public selectedTab = 0;
  public hideTabs : boolean = false;
  public HideOnSearch : boolean =  false;
  public HideTabsHeader : boolean =  false;
  public searchString : string = "";
  public SessionData : any;
  public ContactData : any;
  public PreferenceData : any;
  public imgContactUrl : string = 'asstes/img/defaultAvatar.jpg';

  @ViewChild(SuperTabs) superTabs: SuperTabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private superTabsCtrl: SuperTabsController,
    public events : Events, public modal : ModalController, public global : GlobalProvider,
    public http : HttpProvider) {


  } 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.selectedTab = 1;
    //this.setBadge(); error when going back
    this.getContactData();
    this.getPreferences();
    
  }

  openSettings(data){
    const settingsModal = this.modal.create(SettingsPage,{ contactData: this.ContactData.contact, 
      preferences : this.PreferenceData.list});
    settingsModal.present();
    console.log('Settings opened!');
  }

   getContactData(){
    let contactObj = {
      contactId: this.global.SessionData.contactId.toString()
    };

    let APIname = 'app/getContactsById/';
    this.http.getdata(APIname, contactObj)
    .then(data =>{
      this.ContactData = data;
      if(this.ContactData.contact.photoUrl)
        this.imgContactUrl = this.ContactData.contact.photoUrl;
      console.log("ContactData",this.ContactData);
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });
  }
 
  getPreferences(){
    let contactObj = {
      contactId: this.global.SessionData.contactId.toString()
    };

    let APIname = 'cms/l_userPreference/';
    this.http.getdata(APIname, contactObj)
    .then(data =>{
      this.PreferenceData = data;
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });
  }
  attendance() {
    console.log('Attendance created!')
    this.events.publish("Student:Attendance");
  }

  hygiene() { 
    console.log('Hygiene created!')
    this.events.publish("Student:Hygiene");
  }

  medication() {
    console.log('Medication created!')
    this.events.publish("Student:Medication");
  }

  close(){
    console.log('Close clicked!')
    this.events.publish("Student:Close");
  }

  meal(){
    const menuModal = this.modal.create(MenuPage);
    menuModal.present();
    console.log('Meal opened!');
  }

  health(){
    const healthModal = this.modal.create(MenuPage);
    healthModal.present();
    console.log('Health opened!');
  }

  sleep(){
    console.log('Sleep created!')
    this.events.publish("Student:Sleep");
  }

  onHome(){
    this.navCtrl.setRoot(HomePage);
  }

  setBadge() {
    this.superTabsCtrl.setBadge('newsTab', 9);
  }

  onAdd(){

  }

  onCamera(){

  }

  onSearch(){
    this.HideOnSearch = true;
    console.log("onSearch",this.searchString);
  }

  onFocus(){
    this.HideOnSearch = true;
    console.log("onFocus",this.searchString);
  }

  offFocus(){ 
    //this.HideOnSearch = false;
    console.log("offFocus",this.searchString);
  }

  goSearch(){
    this.HideOnSearch = !this.HideOnSearch;
    console.log("goSearch",this.searchString);
  }

  onTabSelect(ev: any) {
    if (ev.index === 4) {
      let alert = this.alertCtrl.create({
        title: 'Secret Page',
        message: 'Are you sure you want to access that page?',
        buttons: [
          {
            text: 'No',
            handler: () => {
              this.superTabs.slideTo(this.selectedTab);
            }
          }, {
            text: 'Yes',
            handler: () => {
              this.selectedTab = ev.index;
            }
          }
        ]
      });
      alert.present();
    } else {
      this.selectedTab = ev.index;
      this.superTabs.clearBadge(this.pages[ev.index].id);
    }
  }
}
