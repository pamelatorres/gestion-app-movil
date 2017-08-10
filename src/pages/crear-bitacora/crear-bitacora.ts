import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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

  tareas:any;
  puedeCerrarBitacora:boolean;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private http:Http,
    private url:UrlProvider) {
    let bitacora = this.navParams.get('bitacora');
    if(bitacora.observacion == null && bitacora.titulo)
      this.puedeCerrarBitacora = false;
    else
      this.puedeCerrarBitacora = true;
    this.tareas = this.navParams.get('tareas').length;
  }

  ionViewDidLoad() {

  }
	public irA(ruta:string){
  	this.navCtrl.push(ruta,{
      id_bitacora: this.navParams.get('id_bitacora'),
      bitacora: this.navParams.get('bitacora')
    });
  }

  confirmarCerrarBitacora(){
    this.alertCtrl.create({
      title:'Alerta',
      subTitle: '¿Desea cerrar la bitácora?',
      message: 'Será devuelta a quién se la derivó',
      buttons:[
        {
          text:'Aceptar',
          handler:() => {
            this.cerrarBitacora();
          }
        },{
          text:'Cancelar',
          role:'cancel'
        }
      ]
    }).present();
  }

  // buscar una forma mejor de hacerlo
  cerrarBitacora(){
    let data = {
      id_bitacora:this.navParams.get('id_bitacora'),
      id_bitacora_derivacion: this.navParams.get('bitacora').id_bitacora_derivacion
    };
    this.http.post(this.url.url + 'api/v1/CerrarBitacora', JSON.stringify(data))
    .subscribe(data => {
      console.log(data);
      if (data.status == 201 && data.json().r == '1') {
        this.navCtrl.setRoot('HomePage');
        this.presentToast('La bitacora se cerrado correctamente');
      }else{
        this.presentToast('Aun hay tareas pendientes');
      }
    });
  }

  presentToast(title) {
    this.alertCtrl.create({
      title: 'Bitacora',
      subTitle: title,
      buttons:[
        {
          text:'Aceptar'
        }
      ]
    }).present();
  }
}
