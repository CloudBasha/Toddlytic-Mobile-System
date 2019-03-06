import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsfeedDetailPage } from './newsfeed-detail';

@NgModule({
  declarations: [
    NewsfeedDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsfeedDetailPage),
  ],
})
export class NewsfeedDetailPageModule {}
