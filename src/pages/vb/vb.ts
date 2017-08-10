import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  ToastController,
  AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the VbPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vb',
  templateUrl: 'vb.html',
})
export class VbPage {

  bitacora:any;
  user:any;
  detalle:string;
  monto:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private toastCtrl:ToastController,
    private storage:Storage,
    private alertCtrl:AlertController) {

    this.bitacora = this.navParams.get('bitacora');
    this.storage.get('user')
      .then(user => {
        this.user = user;
      });
  }

  ionViewDidLoad() {
    
  }

  guardar(){
    let data = {
      id_bitacora:this.bitacora.id_bitacora,
      id_usuario_vb: this.user.id_usuario,
      detalle_vb: this.detalle,
      monto_vb: this.monto
    };
    this.http.post(this.url.url + 'api/v1/VistoBueno', JSON.stringify(data))
      .subscribe(data => {
        if(data.status == 201){
          this.navCtrl.pop();
          this.presentToast('Se ha creado la petición de visto bueno');
        }
      });
  }

  presentToast(title) {
    this.alertCtrl.create({
      title: 'Visto bueno',
      subTitle:'Se ha creado un visto bueno',
      message: 'Debe esperar a que se autorize',
      buttons: [
        {
          text:'Aceptar'
        }
      ]
    }).present();
  }
}
