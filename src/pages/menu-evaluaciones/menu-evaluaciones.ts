import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenuEvaluacionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu-evaluaciones',
  templateUrl: 'menu-evaluaciones.html',
})
export class MenuEvaluacionesPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  cerrarEvaluacion(){

  }

  evaluarIncidente(){
    this.navCtrl.push('EvaluacionPage',{
      id_incidente: this.navParams.get('id_incidente')
    });
  }

  editarEvaluacion(){

  }
}
