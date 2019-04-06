import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalProvider {

  public currentPage : number = 0;
  public currentPageHeader : boolean = false;
  constructor(public http: HttpClient) {
    console.log('Hello GlobalProvider Provider');
  }

  public getCurrentPageHeader(id){
    this.currentPage = id;
  }

  
}
