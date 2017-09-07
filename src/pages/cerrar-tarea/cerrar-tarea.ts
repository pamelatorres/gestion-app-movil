import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the CerrarTareaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cerrar-tarea',
  templateUrl: 'cerrar-tarea.html',
})
export class CerrarTareaPage {
 
  data:any;
  aceptar:boolean = true;
  aceptarString:string;
  respuesta:string;
  fecha:Date = new Date();
  tarea:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private alertCtrl:AlertController) {
    this.tarea = navParams.get('tarea');
  }

  ionViewDidLoad() {
  }
  onChange(){
    this.aceptar = this.aceptarString == 'si' ? true: false;
  }
  cerrarTarea(){
    let data = {
      id_tarea:this.tarea.id_tarea,
      realizacion_tarea: this.aceptar ? 1 : 0,
      respuesta_tarea: this.respuesta,
      id_bitacora:this.tarea.id_bitacora
    };
    let headers = new Headers(
      { 
        'Content-Type': 'application/json; charset=UTF-8'
      });
    let options = new RequestOptions( {method: RequestMethod.Put, headers: headers });
    this.http.put(this.url.url + 'api/v1/Tareas', JSON.stringify(data), options)
      .subscribe(data => {
        this.alertCtrl.create({
          title:'Tarea',
          subTitle:'Tarea finalizada e informada',
          buttons:['Aceptar']
        }).present();
        this.navCtrl.setRoot('TareasPage');
      });
  }
}
