import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';
import { SuperTabsController } from 'ionic2-super-tabs';
import { MenuPage } from '../menu/menu';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html', 
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

  @ViewChild(SuperTabs) superTabs: SuperTabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController, private superTabsCtrl: SuperTabsController,
    public events : Events, public modal : ModalController) {
  } 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.selectedTab = 1;
    //this.setBadge(); error when going back
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
