import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  student : any;

  meal = {
    milkQty: '',
    menuId: '',
    mealId: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.student = this.navParams.data;
    console.log("student",JSON.stringify(this.student));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');   
  }

  segment(v){
    console.log("segment"); 
  }

  dismiss() { 
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(data);
  }

  checkImg(img){
    if(!img) img = "assets/img/defaultAvatar.jpg";
    return img;
  }
}
