import { Injectable } from '@angular/core';
import { HttpRequestProvider } from './utils/http-request';

@Injectable()
export class TaskService {

  constructor(private request: HttpRequestProvider) {

  }

  getCatagory() {
    return this.request.methodGET(`category-management/categories`);
  }
}
