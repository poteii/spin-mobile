import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { User } from '../../models/user';
import { Status } from '../../config/properties';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private loadingCtrl: LoadingController, private auth: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ngOnInit() {
    this.resetFormGroup();
  }

  resetFormGroup() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  async login() {
    const loading = this.loadingCtrl.create({
      content: "กรุณารอสักครู่...",
      cssClass: "loadingCustomCss"
    });
    loading.present();

    let user: User = new User();

    let result = false;
    let logonResult = await this.auth.authen(this.loginForm.value.username, this.loginForm.value.password);
    if (logonResult === Status.SUCCESS) {
      result = true;
      await this.auth.accessUser();
      loading.dismiss();
      this.navCtrl.push(HomePage);
      console.log(this.auth.getUser().officer);
    } else {
      result = true;
      console.log(Status.ERROR);
    }
  }

}
