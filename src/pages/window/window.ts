import { Component, ViewChild } from '@angular/core';
import { Nav, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { NewsFeedTabsPage } from '../news-feed-tabs/news-feed-tabs';

@IonicPage()
@Component({
  selector: 'page-window',
  templateUrl: 'window.html',
})
export class WindowPage {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = NewsFeedTabsPage;
  state : {
    selectedTab : 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    if(this.navParams.data.rootPage != null) {
      console.log("navparams",JSON.stringify(this.navParams.data));
      this.state = this.navParams.data.state;
      //this.rootPage = this.navParams.data.rootPage;
    }  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WindowPage');
  }

}
