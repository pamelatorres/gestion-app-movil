import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-bitacoras-informadas',
  templateUrl: 'bitacoras-informadas.html',
})
export class BitacorasInformadasPage {

  bitacoras: any;
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
      });
  }

  ionViewDidLoad() {

  }

  getIncidentes(){
    let data = {
      accion: 2,
      id_usuario: this.user.id_usuario,
      estado:'1'
    }
    this.http.post(this.url.url + 'api/v1/BitacorasSp/',JSON.stringify(data))
      .subscribe(data => {
        console.log(data);
        this.bitacoras = data.json();
      });
  }

  abrirBitacora($i){
    this.navCtrl.push('BitacoraPage', {
      bitacora: this.bitacoras[$i]
    });
  }
}
