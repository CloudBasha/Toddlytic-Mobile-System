import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityPage } from '../activity/activity';

@IonicPage()
@Component({
  selector: 'page-newsfeed-detail',
  templateUrl: 'newsfeed-detail.html',
})
export class NewsfeedDetailPage { 
  private news : any = {
    feed : null , messages : [ 
      {title : null , content : null}
    ]
  };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.news.feed = this.navParams.data.rootNavCtrl.rootParams;
    //if(this.navParams.data != null){
      console.log("feed Nav",this.navParams.data.rootNavCtrl.rootParams);
    //}
    
    this.news.messages = this.getMessages(this.news.feed.id);
    //console.log("messages",JSON.stringify(this.news.messages));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedDetailPage');
  }

  onActivity(id){
    this.navCtrl.push(ActivityPage);
  }

  getMessages(id){
     let m = [{ title : "1", content : "A"},
        { title : "2", content : "B"},
        { title : "3", content : "C"},
        { title : "4", content : "D"},
        { title : "5", content : "E"}
      ];
      return m;
  }
}
