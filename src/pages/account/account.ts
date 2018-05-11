import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage implements OnInit {

  public user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthenticationProvider) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  ngOnInit() {
    this.user = this.auth.getUser();
    console.log(this.user);
  }

}
