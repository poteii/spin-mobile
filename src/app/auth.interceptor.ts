import { Observable } from 'rxjs/Observable';
import { HttpInterceptor } from "@angular/common/http/src/interceptor";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthenticationProvider } from "../providers/authentication/authentication";
import { HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import { Locale } from "../config/properties";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authService: AuthenticationProvider) { }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        let local = Locale;
        req = req.clone({ setHeaders: { "Accept-Language": local } });
        if (!this.authService.notAuthorization) {
            if (token !== null || !this.authService.isRefresh()) {
                req = req.clone({ setHeaders: { Authorization: token } });
            }

        }
        return req;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        return next.handle(this.addToken(req, this.authService.getNowToken()))
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

    handle400Error(error) {
        if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
            alert('หมดอายุการใช้งาน กรุณาเข้าสู่ระบบใหม่')
            return this.logoutUser();
        }
        if (error.error.error === 'invalid_request') {
            let errorDesc = error.error.description;
            if (errorDesc.toLowerCase().indexOf("Invalid refresh token".toLowerCase()) > -1) {
                alert('หมดอายุการใช้งาน กรุณาเข้าสู่ระบบใหม่')
            }
        }
        return Observable.throw(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);
            return this.authService.refreshToken()
                .switchMap((newToken: string) => {
                    if (newToken) {
                        this.tokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
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
                    return next.handle(this.addToken(req, token));
                });
        }
    }

    logoutUser() {
        this.authService.logout();
        return Observable.throw("");
    }
}
