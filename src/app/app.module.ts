
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
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
import { ComponentsModule } from '../components/components.module';
import { HttpRequestProvider } from '../providers/utils/http-request';
import { Interceptor } from '../providers/authentication/interceptor';
import { WorkTimePage } from '../pages/work-time/work-time';
import { LoginPage } from '../pages/login/login';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TaskPage,
    TaskTabsPage,
    TaskModalPage,
    TaskDetailPage,
    TaskPartnerPage,
    TaskTagPage,
    WorkTimePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientXsrfModule,
    IonicModule.forRoot(MyApp, {
      dayNames: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
      dayShortNames: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
      monthNames: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
      monthShortNames: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
    }),
    ComponentsModule
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
    TaskTagPage,
    WorkTimePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    AuthenticationProvider,
    HttpRequestProvider,
    TaskService,
    ControllerProvider
  ]
})
export class AppModule { }
