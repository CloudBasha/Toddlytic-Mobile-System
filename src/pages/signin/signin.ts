import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';
import { HttpProvider } from '../../providers/http/http';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})

export class SigninPage { 
  //Admins
  //public loginRequest = { userName : "kana@cloudbasha.com" , password : "carel28"}; 
  //public loginRequest = { userName : "jonathan@cloudbasha.com" , password : "manutd11"};
  //public loginRequest = { userName : "nasiruddin@cloudbasha.com" , password : "toddlyticnas91"}; 
  //public loginRequest = { userName : "enquiry@littlehumanscholars.com.my" , password : "Pinkchick1992"};
  
  //Teachers
  public loginRequest = { userName : "nasiruddin@toddlytic.com" , password : "toddlyticnas91"}; 
  


  public httpreferer : string = '';
  temp : any;

  constructor(public platform: Platform, public navCtrl: NavController, 
    public http : HttpClient ,public navParams: NavParams,
    private httpProvider : HttpProvider, private global : GlobalProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
    this.getHttpreferer();
  }

  showAlert(){

  }

  authenticate(){
    console.log("login", JSON.stringify(this.loginRequest));
    let loginObj = {
      userEmail: this.loginRequest.userName,
      userPassword: this.loginRequest.password,
      browsertype: null,
      devicetype: "Mobile",
      httpreferer: this.httpreferer,
      idToken : null,
      socialType : null
    };

    this.httpProvider.openUrl("login", loginObj)
    .then(data =>{
      this.global.setSession(data,this.loginRequest.userName);
      this.global.setStorage("sessionData",data);
      this.navCtrl.push(TabsPage);
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });
  }

  getHttpreferer(){
    this.httpProvider.getIp()
    .then(data =>{
      this.temp =  data;
      this.httpreferer = this.temp.ip;
      console.log("data",JSON.stringify(data));
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });
  }
}
