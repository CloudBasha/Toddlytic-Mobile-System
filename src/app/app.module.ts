import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin'; 
import { NewsfeedPage } from '../pages/newsfeed/newsfeed';
import { NewsfeedDetailPage } from '../pages/newsfeed-detail/newsfeed-detail'; 
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    NewsfeedPage,
    NewsfeedDetailPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    NewsfeedPage,
    NewsfeedDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
