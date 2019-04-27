import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { SuperTabsModule } from 'ionic2-super-tabs';
//import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    TabsPage
  ],
  imports: [
    IonicPageModule.forChild(TabsPage),
    SuperTabsModule
  ],
})
export class TabsPageModule {}
