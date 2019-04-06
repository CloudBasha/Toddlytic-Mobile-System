import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { SuperTabsModule } from 'ionic2-super-tabs';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin'; 
import { TabsPage } from '../pages/tabs/tabs';
import { CameraPageModule } from '../pages/camera/camera.module';
import { GlobalProvider } from '../providers/global/global';
import { NewsFeedTabsPage } from '../pages/news-feed-tabs/news-feed-tabs';
import { WindowPage } from '../pages/window/window';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';

@NgModule({ 
  declarations: [ 
    MyApp,
    HomePage,
    ListPage,  
    SigninPage,
    TabsPage,
    NewsFeedTabsPage,
    WindowPage
  ],
  imports: [
    SuperTabsModule, 
    BrowserModule,  
    HttpClientModule, 
    CameraPageModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [ 
    MyApp,
    HomePage,
    ListPage,
    SigninPage,
    TabsPage,
    NewsFeedTabsPage,
    WindowPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    DatabaseProvider,
    SQLite,
    SQLitePorter
  ]
})
export class AppModule {}
