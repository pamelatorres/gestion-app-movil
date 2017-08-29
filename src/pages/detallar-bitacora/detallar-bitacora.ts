import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  callback:any;
  data:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private aterCtrl:AlertController) {
    this.bitacora = this.navParams.get('id_bitacora');
    this.callback = this.navParams.get('callback');
    console.log(this.callback);
  }

  ionViewDidLoad() {

  }

  guardar(){
    this.data = {
      observacion: this.observacion,
      id_bitacora: this.bitacora,
      titulo: this.titulo
    }
    this.http.post(this.url.url + 'api/v1/BitacoraDetalle', JSON.stringify(this.data))
    .subscribe(data => {
      if(data.status == 201){
        this.aterCtrl.create({
          title: 'Detallar bitacora',
          subTitle: 'Detalle guardado con exito',
          buttons:['Aceptar']
        }).present();
        this.callback(this.data);
        this.navCtrl.pop();
      }
    });
  }
}
