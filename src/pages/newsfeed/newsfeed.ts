import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Img } from 'ionic-angular';
import { NewsFeedTabsPage } from '../news-feed-tabs/news-feed-tabs';
import { MyApp } from '../../app/app.component';
import { GlobalProvider } from '../../providers/global/global';
import { HttpProvider } from '../../providers/http/http';
import { DatabaseProvider } from '../../providers/database/database';
import { isArray } from 'ionic-angular/util/util';

@IonicPage()
@Component({
  selector: 'page-newsfeed',
  templateUrl: 'newsfeed.html',
})
export class NewsfeedPage {
  public feeds : any[] = [] ;
  sessionData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private app : MyApp,
    private global : GlobalProvider, private httpProvider : HttpProvider,
    private database : DatabaseProvider) {
      this.sessionData = this.global.SessionData;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsfeedPage');
    this.getNewFeedByOrgId();
  }

  groupNewsFeed(data){
    if (data.list.length>0)
    data.list.forEach(item => {
      if(item.auditLog.tableName == 'TRACKING'){
        if (item.tracking!=null){
          this.hasFeed(item);
        }
      }
      else if(item.auditLog.tableName == 'PHOTO' || item.auditLog.tableName == 'PHOTO_TAGGING'){ 
        this.hasPhoto(item);
      }
    }) 
    //console.log('Feeds',this.feeds);
    this.sortNewsFeed();
  }

  sortNewsFeed(){
    this.feeds.sort((a,b) => a.rowid.toString().localeCompare(b.rowid));
    return this.feeds.reverse();
  }

  hasPhoto(item){
    let status_photo = false;
    let theDate = new Date(item.auditLog.created_datetime);
    let string = item.auditLog.newData;
    let values = string.split(',');
    let school_name = values[1];
    let imgUser = this.setImg(item.auditLog.userId.contact.photoUrl);
    //console.log("hasPhoto",item.auditLog.newData,school_name);

    //if(isArray(this.feeds))
    for(let i=0;i<this.feeds.length;i++){
      if(this.feeds[i].school_name == school_name){
        status_photo = true;
        this.feeds[i].badge++;
        this.feeds[i].rowid = item.auditLog.rowId;
        this.feeds[i].activity = this.setActivity(this.feeds[i].activity,"all","reset");
        let title = this.getUserName(item.auditLog.userId.cmsUserId,item.auditLog.userId.name);
        let content = "";
        let news = { title : title , content : content, mine : true, img : imgUser, 
          isPhoto : true, date : theDate, rowid : item.auditLog.rowId};
        this.feeds[i].news.push(news);
        news = null;
      }
      
    }

    if(!status_photo){
      let title = this.getUserName(item.auditLog.userId.cmsUserId,item.auditLog.userId.name);
      let content = "Uploaded photo";
      let imageUrl = "";
      if(item.photo){
        imageUrl = item.photo.imageUrl;
      }
      else {
        imageUrl = item.photoTagging.photo.imageUrl;
      }
      
      let news = { title : title , content : content, mine : true, img : imgUser, photo : imageUrl, 
        isPhoto : true, date : theDate, rowid : item.auditLog.rowId};
      let feed =  {
        header : school_name , img : imgUser , badge : 1, time : theDate,
        message: "Photo uploaded", studentId : "", type : "Photos", selected : false,
        date :theDate, id : item.auditLog.auditId, rowid : item.auditLog.rowId, school_name : school_name,
        is : this.sessionData.type , author : item.auditLog.userId.name, activity : {}, news : []
      };
      feed.activity = this.setActivity(feed.activity,"all","reset");
      feed.news.push(news);
      this.feeds.push(feed);
      feed = null ; news = null;
    }
  }

  hasFeed(item){
    let status_student = false;
    let theDate = new Date(item.auditLog.created_datetime);
    let imgUser = this.setImg(item.auditLog.userId.contact.photoUrl);
    if(isArray(this.feeds))
    for(let i=0;i<this.feeds.length;i++){
      if(this.feeds[i].studentId == item.tracking.student.studentId){
        status_student = true;
        this.feeds[i].time = theDate.getTime();
        this.feeds[i].rowid = item.auditLog.rowId;
        this.feeds[i].activity = this.setActivity(this.feeds[i].activity,item.tracking.typeName,item.tracking.value);
        this.feeds[i].id++;
        this.feeds[i].badge++;
        let title = this.getUserName(item.auditLog.userId.cmsUserId,item.auditLog.userId.name);
        let content = this.getActivity(item.auditLog.tableName,item.tracking.typeName,item.tracking.value,item.tracking.remark);
        let news = {
          title : title, content : content, time : theDate, mine : true, img : imgUser, 
          isPhoto : false, date : theDate, rowid : item.auditLog.rowId, userId : item.auditLog.userId.cmsUserId
        };
        this.feeds[i].news.push(news); 
        news = null;
      }
    }
    
    if(!status_student){
      let title = this.getUserName(item.auditLog.userId.cmsUserId,item.auditLog.userId.name);
      let content = this.getActivity(item.auditLog.tableName,item.tracking.typeName,item.tracking.value,item.tracking.remark);
      let news = { title : title , content : content, mine : true, img : imgUser, 
        isPhoto : false, date : theDate, rowid : item.auditLog.rowId, userId : item.auditLog.userId.cmsUserId };
      let feed =  {
        header : item.tracking.student.name, img : this.setImg(item.tracking.student.photoUrl), badge : 1, time : theDate,
        message: "Activity: Post", studentId : item.tracking.student.studentId, type : "Student", selected : false,
        date : theDate, id : 1, rowid : item.auditLog.rowId, school_name : "",
        is : this.sessionData.type, author : item.auditLog.userId.name, activity : {}, news : []
      };
      feed.activity = this.setActivity(feed.activity,item.tracking.typeName,item.tracking.value);
      feed.news.push(news);
      this.feeds.push(feed);
      feed = null ; news = null;
    }
  }


  getNewFeedByOrgId(){
    console.log("SessionData",this.sessionData);
    //  orgId: 
    let organization = {
      orgId : this.sessionData.organizationId,
      count: "0"
    };

    //let loading = this.global.presentLoading();
    this.httpProvider.getdata("getNewFeedByOrgId", organization)
    .then(data =>{
      this.groupNewsFeed(data);
      //loading.dismiss(); 
    }, (error) => {
      console.log("error",JSON.stringify(error));
    });

  }

  getUserName(cmsUserId,name){
    let title = "Me";
    if(cmsUserId != this.sessionData.userId) title = name;
    return title;
  }

  getActivity(tablename,typename,value,remarks){
    let act = "";
    if(tablename == 'TRACKING' && value == 'True') act = "Activity: " + typename;
    else if (value == "") act = remarks;
    return act;
  }

  setActivity(activity,typeName,value){
    if(value == "True"){
      if(typeName == "checkIn")     activity.checkIn = true;
      if(typeName == "checkOut")    activity.checkOut = true;
      if(typeName == "rashes")      activity.rashes = true;
      if(typeName == "mouthulcer")  activity.mouthulcer = true;
      if(typeName == "blister")      activity.blister = true;
      if(typeName == "droolingsaliva") activity.droolingsaliva = true;
      if(typeName == "redwateryeyes") activity.redwateryeyes = true;
      if(typeName == "cough")       activity.cough = true;
      if(typeName == "runnynose")   activity.runnynose = true;
      if(typeName == "virus")       activity.virus = true;
      if(typeName == "healthCheck")     activity.healthCheck = true;
      if(typeName == "checkIn")     activity.checkIn = true;
    }
    else if(value == "Start"){
      if(typeName == "sleep")       activity.sleep = true;
    }
    else if(value == "reset"){
      if(typeName == "all"){
        activity.checkIn = false;
        activity.checkOut = false;
        activity.rashes = false;
        activity.mouthulcer = false;
        activity.blister = false;
        activity.droolingsaliva = false;
        activity.redwateryeyes = false;
        activity.cough = false;
        activity.runnynose = false;
        activity.virus = false;
        activity.checkIn = false;
      }
    }
    return activity;
  }

  setImg(image){
    let img = 'assets/img/defaultAvatar.jpg';
    if(image != null) img = image;
    return img;
  }


  pressEvent(event,id){
    console.log("event",event);
    console.log("start",id);
    this.feeds[id].selected = true;
  }

  touchend(id){
    console.log("end",id);
    this.feeds[id].selected = false;
  }

  onClick(feed){
    this.app.setRootPage(NewsFeedTabsPage, feed);
    //this.navCtrl.setRoot(NewsFeedTabsPage, { feed : feed});
    //this.navCtrl.push(WindowPage, {state : "selectedTab" , rootPage : "NewsFeedTabsPage"});
  }
}
