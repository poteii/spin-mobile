
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MSG } from '../config/properties';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { HomePage } from '../pages/home/home';
import { WorkTimePage } from '../pages/work-time/work-time';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage: any;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth: AuthenticationProvider) {
    
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.isAuthorized();
    });
  }

  async isAuthorized() {
    let status = await this.auth.accessUser()
    console.log(status)
    if (status === MSG.SUCCESS) {
      let homePage = HomePage;
      let workTimePage = WorkTimePage;
      this.rootPage = workTimePage;
    } else {
      this.rootPage = 'LoginPage';
    }
  }
}

