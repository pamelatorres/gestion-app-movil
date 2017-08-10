import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController ) {
  
  }

  irA(page){
    this.navCtrl.push(page);
  }
}
