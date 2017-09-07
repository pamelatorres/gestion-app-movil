import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';
/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  appName:string;
  appVersionNumber:string;
  appEmail:string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public appVersion: AppVersion) {
    this.appEmail = 'pgm@modulonet.cl';
    this.appVersion.getVersionNumber().then(version => {
      this.appVersionNumber = version;
    });
    this.appVersion.getAppName().then(name => {
      this.appName = name;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
