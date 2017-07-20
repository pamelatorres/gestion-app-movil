import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BitacoraDetalleModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bitacora-detalle-modal',
  templateUrl: 'bitacora-detalle-modal.html',
})
export class BitacoraDetalleModalPage {

  detalle:string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.detalle = this.navParams.get('detalle');
  }

  ionViewDidLoad() {
  }

}
