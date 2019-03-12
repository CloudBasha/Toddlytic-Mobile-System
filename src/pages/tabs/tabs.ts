import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})

export class TabsPage {  
  pages = [
    { pageName: 'NewsfeedPage', title: 'Newsfeed', icon: 'school', id: 'newsTab'},
    { pageName: 'CameraPage', title: 'Camera', icon: 'camera', id: 'camearTab'},
    { pageName: 'CalendarPage', title: 'Calendar', icon: 'calendar', id: 'calendarTab'},
  ];

  public selectedTab = 0;
  public hideTabs : boolean = false;
  public HideOnSearch : boolean =  false;

  @ViewChild(SuperTabs) superTabs: SuperTabs;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {
  } 
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    this.selectedTab = 1;
  }

  onAdd(){

  }

  onCamera(){

  }

  onSearch(){
    this.HideOnSearch = !this.HideOnSearch;
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
