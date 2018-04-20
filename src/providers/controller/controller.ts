import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';

@Injectable()
export class ControllerProvider {

  loader;
  alert;


  constructor(public loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    console.log('Hello LoaderProvider Provider');
  }

  loaderPresent(content) {
    this.loader = this.loadingCtrl.create({
      content: content
    });
    this.loader.present();
  }

  loaderDismiss() {
    this.loader.dismiss();
  }


  alertPresent(title, subTitle) {
    this.alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle
    });
    this.alert.present();
  }


}
