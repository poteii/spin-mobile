import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskTabsPage } from './task-tabs';

@NgModule({
  declarations: [
    TaskTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskTabsPage),
  ],
})
export class TaskTabsPageModule {}
