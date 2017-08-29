import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ModalController } from 'ionic-angular';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import * as moment from 'moment';
/**
 * Generated class for the CerrarVbPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cerrar-vb',
  templateUrl: 'cerrar-vb.html',
})
export class CerrarVbPage {

  data:any;
  aceptar:boolean = true;
  aceptarString:string;
  respuesta:string;
  fecha:Date = new Date();
  vb:any = {};

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private alertCtrl:AlertController,
    private modalCtrl:ModalController) {
    this.vb = this.navParams.get('vb');
    console.log(this.vb);
  }

  ionViewDidLoad() {
  }

  cerrarVb(aceptar){
    let data = {
      id_vb:this.vb.id_vb,
      aprueba_vb: this.aceptar ? 1 : 0,
      respuesta_vb: this.respuesta,
      fecha_vb: moment().format('YYYY-MM-DD')
    };
    let headers = new Headers(
      { 
        'Content-Type': 'application/json; charset=UTF-8'
      });
    let options = new RequestOptions( {method: RequestMethod.Put, headers: headers });
    this.http.put(this.url.url + 'api/v1/VistoBueno', JSON.stringify(data), options)
      .subscribe(data => {
        if(data.json()){
          this.navCtrl.setRoot('VbsPage');
          this.presentAlert();
        }
      });
  }

  presentAlert() {
    let info = this.aceptar ? ' aceptado ' : ' rechazado ';
    let subtitle = 'Visto bueno' + info + 'corretamente';
    this.alertCtrl.create({
      title:'Gestión Municipio',
      subTitle: subtitle,
      buttons:[
        {
          text:'Aceptar'
        }
      ]
    }).present();
  }

  preguntarDerivarVistoBueno(){
    if (this.vb.validador_derivacion == '0' 
      || this.vb.validador_derivacion == null) {
      this.modalCtrl.create('DerivarVistoBuenoPage',{
        vb:this.vb
      }).present();
    }else{
      this.alertCtrl.create({
        title:'Derivar visto bueno', 
        message:'Desea derivar el visto bueno?', 
        buttons:[
          {
            text:'Aceptar',
            handler:() =>{
              this.derivarVistoBueno()
            } 
          },{
            text:'Cancelar'
          }
        ]
      }).present();
    }
  }

  derivarVistoBueno(){
  }

  onChange(){
    this.aceptar = this.aceptarString == 'si' ? true: false;
  }
}
