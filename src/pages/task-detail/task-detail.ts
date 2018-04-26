import { TaskService } from './../../providers/taskService';
import { Component } from '@angular/core';

@Component({
  selector: 'page-task-detail',
  templateUrl: 'task-detail.html'
})

export class TaskDetailPage {

  public myDate: any;
  public bgColor: string;
  public taskTypeList: any[];
  public startTime: string;
  public endTime: string;

  constructor(private taskService: TaskService) {
    this.bgColor = 'l-blue';
    this.getTaskType();
  }


  getTaskType(){
    this.taskService.getCatagory().subscribe(
      catagories=>{
        console.log(catagories);
        this.taskTypeList = catagories;
      }
    )
  }
}
