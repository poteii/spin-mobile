
import { Component } from '@angular/core';
import { TaskDetailPage } from '../task-detail/task-detail';
import { TaskPartnerPage } from '../task-partner/task-partner';
import { TaskTagPage } from '../task-tag/task-tag';

@Component({
  selector: 'page-task-modal',
  templateUrl: 'task-modal.html',
})

export class TaskModalPage {

  public taskDetail: any;
  public taskPartner: any;
  public taskTag: any;

  constructor() {
    this.taskDetail = TaskDetailPage;
    this.taskPartner = TaskPartnerPage;
    this.taskTag = TaskTagPage;
  }
}
