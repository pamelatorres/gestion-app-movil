import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the BitacorasTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
@Component({
  selector: 'page-bitacoras-tabs',
  templateUrl: 'bitacoras-tabs.html'
})
@IonicPage()
export class BitacorasTabsPage {

  bitacorasListRoot = 'BitacorasListPage'
  bitacorasMapRoot = 'BitacorasMapPage'
  bitacorasListInformadasRoot = 'BitacorasInformadasPage';
  bitacorasListDerivadasCerradasRoot = 'BitacorasDerivadasCerradasPage';

  constructor(public navCtrl: NavController) {}

}
