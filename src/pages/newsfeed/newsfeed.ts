import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsfeedDetailPage } from '../newsfeed-detail/newsfeed-detail';

@IonicPage()
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {
  public feeds : any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedPage');
    this.getFeed(); 
  }

  getFeed(){
    this.feeds = [
        {
          header : "Daniel Zakaru", img : "/img/zakaru.png", badge : "5", time : "16:41",
          message: "", id : "5",
          is : "Parent", author : "Tina", activity : {
            checkin : true, feeding : true, images : true, sleep : true, health : true,
            message : "Case note"
          }
        }
      ];
  }

  onClick(feed){
    this.navCtrl.push(NewsfeedDetailPage, { feed : feed});
  }
}
