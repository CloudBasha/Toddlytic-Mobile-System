import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import * as moment from "moment";
import 'moment-timezone';

@Injectable()
export class GlobalProvider {

  public currentPage : number = 0;
  public currentPageHeader : boolean = false;
  public SessionData : any;
  constructor(public http: HttpClient, public storage : Storage, public toast : ToastController,
    public loading : LoadingController) {
    console.log('Hello GlobalProvider Provider');
  
  }

  public getCurrentPageHeader(id){
    this.currentPage = id;
  }

  public setSession(data,userEmail){
    this.SessionData = data;
    this.SessionData.userEmail = userEmail;
  }

  public setStorage(key,data){
    this.storage.set(key,data);
  }

  async getStorage(key){
    return await this.storage.get(key);
  }

  public presentToast(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 9000,
      position: 'bottom',
      showCloseButton : true,
      dismissOnPageChange : true
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  presentLoading() {
    let loading = this.loading.create({
      spinner: 'dots',
      content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box"></div>
        </div>`,
      duration: 1000,
      enableBackdropDismiss : true,
      dismissOnPageChange : true
    });
  
    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });
  
    loading.present();
    return loading;
  }

  getDatestring(){
    //'DD-MM-YYYY HH:mm:ss'
    //moment().tz('Asia/Kuala_Lumpur').format('DD-MM-YYYY HH:mm:ss')
    let d = moment().zone('Asia/Kuala_Lumpur').format('DD-MM-YYYY HH:mm:ss');
    console.log("d",d);
    return d;
  }
}
