import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WindowPage } from './window';

@NgModule({
  declarations: [
    WindowPage,
  ],
  imports: [
    IonicPageModule.forChild(WindowPage),
  ],
})
export class WindowPageModule {}
