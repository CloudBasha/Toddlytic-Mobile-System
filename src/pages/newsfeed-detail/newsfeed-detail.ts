import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, Content, List } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';
import { PopoverController } from 'ionic-angular/components/popover/popover-controller';
import { PopoverComponent } from '../../components/popover/popover';


@IonicPage()
@Component({
  selector: 'page-newsfeed-detail',
  templateUrl: 'newsfeed-detail.html',
})
export class NewsfeedDetailPage { 
  @ViewChild(Content) contentArea: Content;
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;

  private news : any = {
    feed : null , messages : [ 
      {title : null , content : null}
    ]
  };
  private msg : string = "";
  private mutationObserver: MutationObserver;

  private m = [{ title : "Tammy Ong", content : "A", time : "3", mine : true, img : 'assets/img/calendar.svg'},
  { title : "Chris the Cutter", content : "Bla bla and then cow came home to deal with the Milk man, Bla bla and then cow came home to deal with the Milk man" , time : "1", mine : true, img : null},
  { title : "Polishish Bluetooth", content : "Cat cought your tongue and having to hear all the crap in the world hurts, Bla bla and then cow came home to deal with the Milk man", time : "7", mine : false, img : null},
  { title : "Mumbai Wala Games", content : "Dark as night, the hurst of the new dawn. This is a test to see if the text wrapping works for long sentences, Bla bla and then cow came home to deal with the Milk man", time : "4", mine : true, img : null},
  { title : "The Champion with no legs", content : "Early as the worm and many more returns of the day, Bla bla and then cow came home to deal with the Milk man" ,time : "2", mine : false, img : null}
];
  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController,
    private popoverController : PopoverController) {
    this.news.feed = this.navParams.data.rootNavCtrl.rootParams;
    //if(this.navParams.data != null){
      console.log("feed Nav",this.navParams.data.rootNavCtrl.rootParams);
    //}
    
    this.news.messages = this.getMessages(this.news.feed.id);
    //console.log("messages",JSON.stringify(this.news.messages));

  }

  async presentPopover(ev: any) { 
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  sendChat(){
    if (this.msg == '') return;
    let a = [{title: "Me", content : "", time : Date.now() , mine : true, img : null}];
    this.m.push({title: "Me", content : this.msg, time : "10" , mine : true, img : null});
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
      return this.m;
  }
}
