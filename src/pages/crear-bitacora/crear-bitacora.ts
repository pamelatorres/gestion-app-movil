import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AgendarPage } from '../agendar/agendar';
import { DerivarresPage } from '../derivarres/derivarres';
import { VbPage } from '../vb/vb';
import { SubirdocPage } from '../subirdoc/subirdoc';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the CrearBitacoraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-crear-bitacora',
  templateUrl: 'crear-bitacora.html',
})
export class CrearBitacoraPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }
	public irA(ruta:string){
  	let page:any;

  	switch (ruta) {
  		case "agendar":
  			page = 'AgendarPage';
  			break;
  		case "vb":
  			page = 'VbPage';
  			break;
  		case "subir-archivo":
  			page = 'SubirdocPage';
  			break;
  		case "derivar":
  			page = 'DerivarresPage';
  			break;
  		default:
  			break;
  	}

  	this.navCtrl.push(page,{
      id_bitacora: this.navParams.get('id_bitacora')
    });
  }
}
