import { TaskModalPage } from './../task-modal/task-modal';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})

export class TaskPage {

  public taskModalPage: any;

  constructor() {
    this.taskModalPage = TaskModalPage;
  }


}
