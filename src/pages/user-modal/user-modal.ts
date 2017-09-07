import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the UserModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-modal',
  templateUrl: 'user-modal.html',
})
export class UserModalPage {

  user:any = {};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private storage:Storage) {

    this.storage.get('user')
      .then(user => {
        this.user = user;
        console.log(this.user);
      });
  }

  ionViewDidLoad() {
  }

  cerrar(){
    this.navCtrl.pop();
  }
}
