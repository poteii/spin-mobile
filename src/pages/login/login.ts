import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { HomePage } from '../home/home';
import { ControllerProvider } from '../../providers/controller/controller';
import { MSG, VARIABLE } from '../../config/properties';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {
  homePage = HomePage;
  loginForm: FormGroup;
  constructor(public navCtrl: NavController,
    private auth: AuthenticationProvider,
    private ctrl: ControllerProvider) {
  }

  ngOnInit() {
    this.resetFormGroup();
    this.isAuthorized();
  }

  resetFormGroup() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  async login() {
    this.ctrl.loaderPresent("กรุณารอสักครู่...");
    if (this.loginForm.valid) {
      // Rememberme
      localStorage.setItem(VARIABLE.REFRESH_PWD, btoa(this.loginForm.value.password));
      if (this.loginForm.value.remember) {
        localStorage.setItem(VARIABLE.USR, btoa(this.loginForm.value.username));
        localStorage.setItem(VARIABLE.PWD, btoa(this.loginForm.value.password));
        localStorage.setItem(VARIABLE.RMB, 'Default');
      } else {
        localStorage.removeItem(VARIABLE.USR);
        localStorage.removeItem(VARIABLE.PWD);
        localStorage.removeItem(VARIABLE.RMB);
      }

      // Auth
      let response = await this.auth.authen(this.loginForm.value.username, this.loginForm.value.password);
      console.log()
      if (response === MSG.SUCCESS) {
        this.navCtrl.setRoot('TabPage');
        this.ctrl.loaderDismiss();
      } else {
        this.ctrl.loaderDismiss();
        this.ctrl.alertPresent("เกิดข้อผิดพลาด", "กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน");
      }
    }
  }

  async isAuthorized() {
    this.ctrl.loaderPresent("กรุณารอสักครู่...");
    await setTimeout(async () => {
      let status = await this.auth.accessUser()
      console.log(status)
      if (status === MSG.SUCCESS) {
        this.navCtrl.setRoot('TabPage')
      }
      this.ctrl.loaderDismiss();
    }, 1000)
  }
}
