import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URL } from '../../config/properties';

@Injectable()
export class HttpRequestProvider {

  private headers = new HttpHeaders({ "Content-Type": `application/json` });

  constructor(public http: HttpClient) {}

  methodGET(path: string): Observable<any> {
    return this.http.get(URL + path);
  }

  methodDelete(path: string): Observable<any> {
    return this.http.delete(URL + path);
  }

  methodPOST(path: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http.post(URL + path, body, { responseType: 'json', headers: this.headers });
  }

  methodPUT(path: string, param: any): Observable<any> {
    const body = JSON.stringify(param);
    return this.http.put(URL + path, body, { responseType: 'json', headers: this.headers });
  }

  methodPOSTWithHeader(path: string, param: any, options: any): Observable<any> {
    return this.http.post(URL + path, param, options);
  }

  methodPUTWithHeader(path: string, param: any, options: any): Observable<any> {
    return this.http.put(URL + path, param, options);
  }
}
