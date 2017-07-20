import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
//import { DocumentacionPage } from '../documentacion/documentacion';
import { Storage } from '@ionic/storage';

import { UrlProvider } from '../../providers/url/url';



/**
 * Generated class for the IncidentesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-incidentes',
  templateUrl: 'incidentes.html',
})
export class IncidentesPage {

	incidentes: any;
  user:any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public http: Http,
    private url:UrlProvider,
    private storage:Storage) {
    this.storage.get('user')
      .then(user => {
        this.user = user;
        this.getIncidentes();
      })
  }

  ionViewDidLoad() {

  }

  getIncidentes(){
  	this.http.get(this.url.url + 'api/v1/UsuariosIncidentes/' + this.user.id_usuario)
  		.subscribe(data => {
  			this.incidentes = data.json();
  		});
  }

  abrirDocumentacion($id){
  	this.navCtrl.push('BitacoraPage', {
  		id_incidente: $id
  	});
  }
}
