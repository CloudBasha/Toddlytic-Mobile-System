import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpProvider {
  headers : any;
  API_URL : string = 'https://system.toddlytic.com/';
  secret : string  = '';
  students: any;
  debug : boolean = false;
  constructor(public http: HttpClient) {
    if(this.debug) console.log('Hello HttpProvider Provider');
    this.headers = new Headers();
    let username = 'app';
    let password = 'xb8Icmdam9ZWNc4W';
    this.secret = username  + " : " + password;
    this.headers.append('Authorization', 'Basic ' + btoa(this.secret));  
    this.headers.append("Access-Control-Allow-Origin", "*");
    //this.headers.append('Access-Control-Max-Age', '3600');
    //this.headers.append('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept');
    this.headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    this.headers.append('Accept','application/json');
    this.headers.append('Content-Type', 'application/json; charset=UTF-8');
  }

  openUrl(method, reqObj){
    return new Promise ( resolve =>{
      this.http.post(this.API_URL + method, reqObj)
      .subscribe(data =>{ 
        resolve(data);
        if(this.debug) console.log("data",JSON.stringify(data));
      }, (error) => {
        console.log("error",method,JSON.stringify(error));
      });
    });
  }


  public getdata(method,reqObj){
    if(this.debug) console.log("Param",JSON.stringify(reqObj));
    if(this.debug) console.log("Url",this.API_URL + method);
      return new Promise ( resolve => {
        this.http.post(this.API_URL + method, reqObj,this.headers)
        .subscribe(data => { 
          resolve(data);
      }, err => {
        console.log("err",JSON.stringify(err));
        console.log("Param",JSON.stringify(reqObj));
        console.log("URL",this.API_URL + method);
      })
    });
  }

  public getIp(){
    return new Promise ( resolve => {
      this.http.get('http://myexternalip.com/json')
      .subscribe(data => { 
        resolve(data);
    }, err => {
      console.log("err",JSON.stringify(err));
    })
  });
  }
}
