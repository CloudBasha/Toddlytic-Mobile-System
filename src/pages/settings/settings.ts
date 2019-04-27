import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ViewController} from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  sessionData : any;
  contactData : any;
  preferenceData : any;
  section : string = 'profile';
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,
    public global : GlobalProvider) {
    this.sessionData = this.global.SessionData;

    this.contactData = this.navParams.get('contactData');
    console.log("Contact Data",this.contactData);
    this.preferenceData = this.navParams.get('preferences');
    console.log("Preference Data",this.preferenceData);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

}
