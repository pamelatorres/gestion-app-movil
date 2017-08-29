import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  clasificaciones: any;
  clasificacion: any;

  constructor(public navCtrl: NavController,
              private modalCtrl:ModalController ) {
  }

  irA(page){
    this.navCtrl.push(page);
  }

  openUserModal(){
    this.modalCtrl.create('UserModalPage').present();
  }
}
