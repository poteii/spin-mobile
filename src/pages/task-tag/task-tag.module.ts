import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskTagPage } from './task-tag';

@NgModule({
  declarations: [
    TaskTagPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskTagPage),
  ],
})
export class TaskTagPageModule {}
