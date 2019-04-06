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
     let m = [{ title : "1", content : "A", time : "3"},
        { title : "2", content : "Bla bla" , time : "1"},
        { title : "3", content : "Cat cought your tongue", time : "7"},
        { title : "4", content : "Dark as night", time : "4"},
        { title : "5", content : "Early as the worm" ,time : "2"}
      ];

      m.sort((a,b) => a.time.localeCompare(b.time));
      return m;
  }
}
