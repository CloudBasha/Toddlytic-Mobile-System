import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Content, List } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { GlobalProvider } from '../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-newsfeed-detail',
  templateUrl: 'newsfeed-detail.html',
})
export class NewsfeedDetailPage { 
  @ViewChild(Content) contentArea: Content;
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;

  public news : any = {
    feed : null , messages : []
  };
  public msg : string = "";
  private mutationObserver: MutationObserver; 

  public m : any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController,
     private global : GlobalProvider) {
    this.news.messages = this.navParams.data.rootNavCtrl.rootParams.news;
    this.news.messages.reverse();
      console.log("feed Nav",this.navParams.data.rootNavCtrl.rootParams);    
    //this.news.messages = this.getMessages(this.news.feed.id);
  }

  sendChat(){
    if (this.msg == '') return;
    let a = [{title: "Me", content : "", time : Date.now() , mine : true, img : null}];
    this.m.push({title: "Me", content : this.msg, time : Date.now() , mine : true, img : null});
    this.msg = "";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedDetailPage');
    this.mutationObserver = new MutationObserver((mutations) => {
        this.contentArea.scrollToBottom();
    });
    //let n = this.chatList.nativeElement;
    this.mutationObserver.observe(this.chatList.nativeElement, { childList: true });
  }

  gotoSlider(id){
    //this.navCtrl.push(ActivityPage);
    this.superTabsCtrl.slideTo(id);
  }

  getMessages(id){
      this.m.sort((a,b) => a.time.localeCompare(b.time));
      return this.m.reverse();
  }
  
}
