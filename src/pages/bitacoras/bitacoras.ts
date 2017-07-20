import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';



/**
 * Generated class for the BitacorasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bitacoras',
  templateUrl: 'bitacoras.html',
})
export class BitacorasPage {
  
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
    this.http.get(this.url.url + 'api/v1/Bitacoras/' + this.user.id_usuario)
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
