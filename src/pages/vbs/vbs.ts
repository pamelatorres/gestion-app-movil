import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the VbsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vbs',
  templateUrl: 'vbs.html',
})
export class VbsPage {

  vbs:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private storage:Storage,
    private url:UrlProvider,
    private modalCtrl:ModalController,
    private popoverCtrl:PopoverController) {
    this.storage.get('user')
      .then(user => {
        this.obtenerVistosBuenos(user.id_usuario);
      });
  }

  ionViewDidLoad() {
  }

  obtenerVistosBuenos(idUsuario){
    this.http.get(this.url.url + 'api/v1/VistoBueno/' + idUsuario + '/1')
      .subscribe(data => {
        if (data.status == 200) {
          this.vbs = data.json();
          this.vbs.forEach(vb => {
            if (vb.aprueba_vb == null) { 
              vb.textoAprueba = 'En espera';
            } else if(+ vb.aprueba_vb == 0)  {
              vb.textoAprueba = 'Rechazado';              
            }else{
              vb.textoAprueba = 'Aprobado';
            }
          });
          console.log(this.vbs);
        }
      });
  }
  cerrarVb(vb){
    if(vb.aprueba_vb == null){
      this.navCtrl.push('CerrarVbPage',{
        vb:vb
      });
    }
  }
}
