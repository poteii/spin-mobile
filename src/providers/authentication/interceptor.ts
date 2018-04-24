import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse, HttpXsrfTokenExtractor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AuthenticationProvider } from "./authentication";
import { LOCAL, MSG } from "../../config/properties";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally'
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/throw';

@Injectable()
export class Interceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private auth: AuthenticationProvider, 
        // private xsrfTokenExt: HttpXsrfTokenExtractor
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(this.addAuthorizationToken(req, this.auth.getAuthorizationHeader()))
            .catch(error => {
                if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 400:
                            return this.handle400Error(error);
                        case 401:
                            return this.handle401Error(req, next);
                        default:
                            return Observable.throw(error);
                    }
                } else {
                    return Observable.throw(error);
                }
            });
    }

    addAuthorizationToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        req = req.clone({ setHeaders: { "Accept-Language": LOCAL.NOW_LOCAL } });
        if (token && this.auth.authorizationHeader) {
            req = req.clone({ setHeaders: { Authorization: token } });

            // const xsrfToken = this.xsrfTokenExt.getToken() as string;
            // if (xsrfToken !== null) {
            //     const baseUrl = req.url;
            //     req = req.clone({ url: `${baseUrl}?_csrf=${xsrfToken}`, setHeaders: { 'X-CSRF-TOKEN': xsrfToken } });
            // }
        }
        console.info(req)
        return req;
    }

    // Error 400 Handle
    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            console.log('หมดอายุการใช้งาน กรุณาเข้าสู่ระบบใหม่')
            return this.logoutUser();
        }
        if (error.error.error === 'invalid_request') {
            let errorDesc = error.error.description;
            if (errorDesc.toLowerCase().indexOf("Invalid refresh token".toLowerCase()) > -1) {
                console.log('หมดอายุการใช้งาน กรุณาเข้าสู่ระบบใหม่')
            }
        }
        return Observable.throw(error);
    }

    // Error 401 Handle || Unauthorization
    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);

            // refresh token
            return this.auth.refreshToken()
                .switchMap((status: string) => {
                    if (status === MSG.SUCCESS) {
                        this.tokenSubject.next(this.auth.getAuthorizationHeader());
                        return next.handle(this.addAuthorizationToken(req, this.auth.getAuthorizationHeader()));
                    }
                    return this.logoutUser();
                })
                .catch(error => {
                    return this.logoutUser();
                })
                .finally(() => {
                    this.isRefreshingToken = false;
                });
        } else {
            return this.tokenSubject
                .filter(token => token != null)
                .take(1)
                .switchMap(token => {
                    return next.handle(this.addAuthorizationToken(req, token));
                });
        }
    }

    logoutUser() {
        this.auth.logout();
        return Observable.throw('unauthorization');
    }
}