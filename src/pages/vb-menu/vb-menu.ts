import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VbMenuPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vb-menu',
  templateUrl: 'vb-menu.html',
})
export class VbMenuPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  aprovarVB(aceptar){
    this.navCtrl.push('CerrarVbPage',{
      aceptar:aceptar,
      vb:this.navParams.get('vb')
    });
  }
}
