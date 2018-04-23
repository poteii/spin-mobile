import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskPartnerPage } from './task-partner';

@NgModule({
  declarations: [
    TaskPartnerPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskPartnerPage),
  ],
})
export class TaskPartnerPageModule {}
