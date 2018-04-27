import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VARIABLE, MSG } from '../../config/properties';
import { HttpRequestProvider } from '../utils/http-request';
import { User } from '../../models/user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';

@Injectable()
export class AuthenticationProvider {

  public authorizationHeader = true;
  private user: User;

  constructor(private request: HttpRequestProvider) {
  }

  authen(username: string, password: string) {
    // Close Interceptor authorization header
    this.authorizationHeader = false;

    // Set Form Data Param
    let data = new FormData();
    data.append("grant_type", "password");
    data.append("username", username);
    data.append("password", password);

    // Set Custom header
    const headers = new HttpHeaders({
      "Authorization": `Basic ${VARIABLE.CLIENTID}`
    })
    const options = { headers: headers };

    // Request
    return this.request.methodPOSTWithHeader('oauth/token', data, options).toPromise()
      .then(token => {
        // Open Interceptor authorization header
        this.authorizationHeader = true;
        if (token) {
          localStorage.setItem(VARIABLE.ACCESS_TOKEN, btoa(token.access_token));
          localStorage.setItem(VARIABLE.TOKEN_TYPE, btoa(token.token_type));
          localStorage.setItem(VARIABLE.REFRESH_TOKEN, btoa(token.refresh_token));

          // Then go to get User
          return this.accessUser();
        } else {
          console.log('error token')
          return MSG.ERROR;
        }
      })
      .catch(error => {
        console.log(error)
        // Open Interceptor authorization header
        this.authorizationHeader = true;

        // Remove token in localStorage
        localStorage.removeItem(VARIABLE.ACCESS_TOKEN);
        localStorage.removeItem(VARIABLE.TOKEN_TYPE);
        localStorage.removeItem(VARIABLE.REFRESH_TOKEN);
        return MSG.ERROR;
      })
  }

  accessUser(): Promise<string> {
    return this.request.methodGET('user-management/users/me').toPromise()
      .then(user => {
        if (user) {
          // Set data user
          let accessUser = new User();
          accessUser = user.User;
          if (user.Officer) {
            accessUser.officer = user.Officer;
          }
          if (user.Department) {
            accessUser.department = user.Department;
          }
          this.user = accessUser;
          return MSG.SUCCESS;
        } else {
          console.log('No user for this token')
          return MSG.ERROR;
        }
      }).catch(error => {
        console.log(error)
        return MSG.ERROR;
      });
  }

  logout() {
    this.removeToken();
  }

  removeToken() {
    localStorage.removeItem(VARIABLE.ACCESS_TOKEN)
    localStorage.removeItem(VARIABLE.TOKEN_TYPE)
    localStorage.removeItem(VARIABLE.REFRESH_TOKEN)
    localStorage.removeItem(VARIABLE.REFRESH_PWD);
  }

  refreshToken(): Observable<string> {
    // Close Interceptor authorization header
    this.authorizationHeader = false;

    // Set Form Data Param
    var data = new FormData();
    data.append("grant_type", "refresh_token");
    data.append("password", atob(localStorage.getItem(VARIABLE.REFRESH_PWD)));
    const headers = new HttpHeaders({
      "Authorization": `Basic ${VARIABLE.CLIENTID}`
    })
    const options = { headers: headers }

    // If have refresh token
    if (this.getRefreshToken()) {
      return this.request.methodPOSTWithHeader(`oauth/token?grant_type=refresh_token&refresh_token=${this.getRefreshToken()}`, data, options)
        .map(token => {
          this.authorizationHeader = true;
          if (token) {
            localStorage.setItem(VARIABLE.ACCESS_TOKEN, btoa(token.access_token));
            localStorage.setItem(VARIABLE.TOKEN_TYPE, btoa(token.token_type));
            localStorage.setItem(VARIABLE.REFRESH_TOKEN, btoa(token.refresh_token));
            return MSG.SUCCESS
          } else {
            console.log('Refresh Error')
            this.removeToken();
            return MSG.ERROR;
          }
        }, error => {
          this.authorizationHeader = true;
          console.log('หมดอายุการใช้งาน กรุณาเข้าสู่ระบบใหม่')
          this.logout();
        })
    } else {
      this.authorizationHeader = true
      return Observable.of(MSG.ERROR)
    }
  }

  getUser(): User {
    return this.user;
  }

  getAccessToken(): string {
    let access_token: any = localStorage.getItem(VARIABLE.ACCESS_TOKEN);
    if (access_token) {
      return `${atob(access_token)}`;
    }
    return '';
  }

  getRefreshToken(): string {
    let refresh_token: any = localStorage.getItem(VARIABLE.REFRESH_TOKEN);
    if (refresh_token) {
      return `${atob(refresh_token)}`;
    }
    return '';
  }

  getAuthorizationHeader(): string {
    let access_token: any = localStorage.getItem(VARIABLE.ACCESS_TOKEN);
    let token_type: any = localStorage.getItem(VARIABLE.TOKEN_TYPE);
    if (access_token) {
      return `${atob(token_type)} ${atob(access_token)}`;
    }
    return '';
  }

}
