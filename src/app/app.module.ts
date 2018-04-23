
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestService } from '../providers/utils/http-request.service';
import { AuthInterceptor } from './auth.interceptor';
import { ControllerProvider } from '../providers/controller/controller';


//Pages
import { HomePage } from '../pages/home/home';
import { TaskModalPage } from '../pages/task-modal/task-modal';
import { TaskPage } from '../pages/task/task';
import { TaskTabsPage } from '../pages/task-tabs/task-tabs';
import { TaskPartnerPage } from '../pages/task-partner/task-partner';
import { TaskTagPage } from '../pages/task-tag/task-tag';
import { TaskDetailPage } from '../pages/task-detail/task-detail';
import { TaskService } from '../providers/taskService';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TaskPage,
    TaskTabsPage,
    TaskModalPage,
    TaskDetailPage,
    TaskPartnerPage,
    TaskTagPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TaskPage,
    TaskTabsPage,
    TaskModalPage,
    TaskDetailPage,
    TaskPartnerPage,
    TaskTagPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthenticationProvider,
    HttpRequestService,
    TaskService,
    ControllerProvider
  ]
})
export class AppModule { }
