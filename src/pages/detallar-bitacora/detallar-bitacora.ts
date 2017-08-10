import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';


/**
 * Generated class for the DetallarBitacoraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detallar-bitacora',
  templateUrl: 'detallar-bitacora.html',
})
export class DetallarBitacoraPage {

  titulo:string = '';
  observacion:string = '';
  bitacora:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private toastCtrl:ToastController) {
    this.bitacora = this.navParams.get('id_bitacora');
  }

  ionViewDidLoad() {

  }

  guardar(){
    let data = {
      observacion: this.observacion,
      id_bitacora: this.bitacora,
      titulo: this.titulo
    }
    this.http.post(this.url.url + 'api/v1/BitacoraDetalle', JSON.stringify(data)).subscribe(data => {
      if(data.status == 201){
        let toast = this.toastCtrl.create({
          message: 'Detalle guardado con exito',
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        this.navCtrl.setRoot('BitacorasPage');
      }
    });
  }
}
