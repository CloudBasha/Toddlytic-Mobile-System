import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsFeedTabsPage } from '../news-feed-tabs/news-feed-tabs';
import { WindowPage } from '../window/window';
import { MyApp } from '../../app/app.component';


@IonicPage()
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {
  public feeds : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private app : MyApp) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedPage');
    this.getFeed(); 
  }

  getFeed(){
    this.feeds = [
      {
        header : "Daniel Zakaru", img : "/assets/img/my-profile.png", badge : "5", time : "16:41",
        message: "Daniel did great in school", id : "5", type : "Student",
        is : "Parent", author : "Tina", activity : {
          checkin : true, feeding : true, images : true, sleep : true, health : true,
          message : "Case note, write something"
        }
      },
      {
        header : "Program Taska", img : "/assets/img/my-profile.png", badge : "8", time : "13:41",
        message: "Class started late today due rain", id : "5", type : "Program",
        is : "Teacher", author : "Kana", activity : {
          checkin : false, feeding : false, images : true, sleep : false, health : true,
          message : "Case note here"
        }
      },
      {
        header : "School 1", img : "/assets/img/my-profile.png", badge : "0", time : "11:43",
        message: "Tomorrow we have new wing with a outdoor playground", id : "5", type : "School",
        is : "Admin", author : "Jon", activity : {
          checkin : true, feeding : true, images : false, sleep : true, health : false,
          message : "Case note, the problem is" 
        }
      }

    ];
  } 

  onClick(feed){
    this.app.setRootPage(NewsFeedTabsPage, feed);
    //this.navCtrl.setRoot(NewsFeedTabsPage, { feed : feed});
    //this.navCtrl.push(WindowPage, {state : "selectedTab" , rootPage : "NewsFeedTabsPage"});
  }
}
