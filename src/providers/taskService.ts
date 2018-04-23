import { HttpRequestService } from './utils/http-request.service';
export class TaskService{

  constructor(private request: HttpRequestService){

  }

  getCatagory(){
    return this.request.requestMethodGET(`category-management/categories`);
  }
}
