import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { MyApp } from '../../app/app.component';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-news-feed-tabs',
  templateUrl: 'news-feed-tabs.html',
})
export class NewsFeedTabsPage {
//NewsFeedDetailPage 
  pages = [
    { pageName: 'NewsfeedDetailPage', title: 'Newsfeed', icon: 'school', id: 'newsDetailTab', nav : null},
    { pageName: 'ActivityPage', title: 'Activity', icon: 'body', id: 'activityTab' , nav : null},
    { pageName: 'CalendarPage', title: 'Calendar', icon: 'calendar', id: 'calendarTab' , nav : null},
    { pageName: 'ProgramPage', title: 'Program', icon: 'podium', id: 'programTab' , nav : null},
    //{ pageName: 'ServicesPage', title: 'Service', icon: 'trophy', id: 'servicesTab' , nav : null},
  ];
  @ViewChild(SuperTabs) superTabs: SuperTabs;
  public selectedTab = 0;
  private news : any = {
    feed : null , messages : [ 
      {title : null , content : null} 
    ]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private app : MyApp) {
    this.news.feed = this.navParams.data; 
    this.pages[0].nav = this.news.feed;
    //let data = this.navParams.data.rootNavCtrl.rootParams;
    //this.news.feed = data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsFeedTabsPage');
    console.log("pages", this.pages);
    this.news.feed = this.pages[0].nav.rootNavCtrl.rootParams;
  }

  onTabSelect(ev: any) {
    this.selectedTab = ev.index;
  }

  public onBack(){
    let state = { selectedTab : this.onTabSelect };
    this.app.setRootPage(TabsPage, state);
  }
}
