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
import { NewsFeedTabsPage } from '../pages/news-feed-tabs/news-feed-tabs';
import { WindowPage } from '../pages/window/window';

import { GlobalProvider } from '../providers/global/global';
import { HttpProvider } from '../providers/http/http';
import { DatePipe, LowerCasePipe, TitleCasePipe, CurrencyPipe, JsonPipe, PercentPipe, UpperCasePipe } from '@angular/common'; 
import { SettingsPage } from '../pages/settings/settings';

@NgModule({ 
  declarations: [ 
    MyApp,
    HomePage,
    ListPage,   
    SigninPage,
    TabsPage,
    NewsFeedTabsPage,
    WindowPage,
    MenuPage,
    SettingsPage
  ],
  imports: [
    SuperTabsModule, 
    BrowserModule,   
    HttpClientModule,
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
    MenuPage,
    SettingsPage
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
