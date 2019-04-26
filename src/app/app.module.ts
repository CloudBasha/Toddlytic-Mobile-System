import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { SuperTabsModule } from 'ionic2-super-tabs';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { DatabaseProvider } from '../providers/database/database';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { SigninPage } from '../pages/signin/signin'; 
import { TabsPage } from '../pages/tabs/tabs';
import { MenuPage } from '../pages/menu/menu';

import { CameraPageModule } from '../pages/camera/camera.module';
import { GlobalProvider } from '../providers/global/global';
import { NewsFeedTabsPage } from '../pages/news-feed-tabs/news-feed-tabs';
import { WindowPage } from '../pages/window/window';
import { PopoverComponent } from '../components/popover/popover';
import { HttpProvider } from '../providers/http/http';
import { DatePipe } from '@angular/common'; 
import { LowerCasePipe } from '@angular/common';
import { TitleCasePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { JsonPipe } from '@angular/common';
import { PercentPipe } from '@angular/common';
import { UpperCasePipe } from '@angular/common';

@NgModule({ 
  declarations: [ 
    MyApp,
    HomePage,
    ListPage,  
    SigninPage,
    TabsPage,
    NewsFeedTabsPage,
    WindowPage,
    MenuPage
  ],
  imports: [
    SuperTabsModule, 
    BrowserModule,   
    HttpClientModule, 
    CameraPageModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    WindowPage, 
    MenuPage
  ],
  providers: [ 
    StatusBar,
    SplashScreen,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GlobalProvider,
    DatabaseProvider,
    SQLite,
    SQLitePorter,
    HttpProvider,
    DatePipe,
    LowerCasePipe,
    TitleCasePipe,
    CurrencyPipe,
    JsonPipe,
    PercentPipe,
    UpperCasePipe
  ]
})
export class AppModule {}
