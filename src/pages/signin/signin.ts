import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  public loginRequest = { userName : "jonathan@cloudbasha.com" , password : "manutd11"};

  constructor(public platform: Platform, public navCtrl: NavController, 
    public http : HttpClient ,public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

  authenticate(){
    console.log("login", JSON.stringify(this.loginRequest));
    let loginObj = {
      userEmail: this.loginRequest.userName,
      userPassword: this.loginRequest.password,
      browsertype: null,
      devicetype: "Mobile",
      httpreferer: "127.0.0.1",
      idToken : null,
      socialType : null
    };
    console.log("req",JSON.stringify(loginObj));
    
    this.http.post("https://system.toddlytic.com/login", loginObj)
    .subscribe(data =>{
      console.log("data",JSON.stringify(data));
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });

  }
}
