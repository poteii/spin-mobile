import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkTimePage } from './work-time';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WorkTimePage
  ],
  imports: [
    IonicPageModule.forChild(WorkTimePage),
    ComponentsModule
  ],
})
export class WorkTimePageModule { }
