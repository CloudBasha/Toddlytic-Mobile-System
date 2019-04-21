import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsFeedTabsPage } from './news-feed-tabs';

@NgModule({
  declarations: [
    NewsFeedTabsPage
  ],
  imports: [
    IonicPageModule.forChild(NewsFeedTabsPage),
  ],
})
export class NewsFeedTabsPageModule {}
