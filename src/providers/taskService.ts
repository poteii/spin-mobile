import { Injectable } from '@angular/core';
import { HttpRequestService } from './utils/http-request.service';

@Injectable()
export class TaskService {

  constructor(private request: HttpRequestService) {

  }

  getCatagory() {
    return this.request.requestMethodGET(`category-management/categories`);
  }
}
