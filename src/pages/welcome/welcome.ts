import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/catch';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


/**
 * Generated class for the WelcomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage:Storage,
    private auth:AuthServiceProvider) {
  }

  ionViewDidLoad() {
  }
  irA(page){
    this.navCtrl.push(page);
  }
}
