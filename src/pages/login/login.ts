import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { User } from '../../models/user';
import { Status } from '../../config/properties';
import { HomePage } from '../home/home';
import { ControllerProvider } from '../../providers/controller/controller';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private auth: AuthenticationProvider,
    private ctrl: ControllerProvider) {
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
    this.ctrl.loaderPresent("กรุณารอสักครู่...");

    let user: User = new User();

    let result = false;
    await setTimeout(async () => {
      let logonResult = await this.auth.authen(this.loginForm.value.username, this.loginForm.value.password);
      if (logonResult === Status.SUCCESS) {
        result = true;
        await this.auth.accessUser();
        this.ctrl.loaderDismiss();
        this.navCtrl.push('TabPage');
        console.log(this.auth.getUser().officer);
      } else {
        result = false;
        console.log(Status.ERROR);
      }

      setTimeout(() => {
        if (!result) {
          this.ctrl.loaderDismiss();
          this.ctrl.alertPresent("เกิดข้อผิดพลาด", "กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน");
        }
      }, 5000);
    }, 2500)
  }

}
