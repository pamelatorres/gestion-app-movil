import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController,LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

@IonicPage()
@Component({
  selector: 'page-bitacora-detalle-modal',
  templateUrl: 'bitacora-detalle-modal.html',
})
export class BitacoraDetalleModalPage {

  titulo:string;
  detalle:string;
  agenda:any;
  tipo:string;
  puedeRevocar:boolean;
  agendaRevocada:boolean;
  loading:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl:AlertController,
    private http:Http,
    private url:UrlProvider,
    private viewCtrl:ViewController,
    private loadCtrl:LoadingController) {
    this.detalle = this.navParams.get('detalle');
    this.titulo = this.navParams.get('titulo');
    this.tipo = this.navParams.get('tipo');
    if (this.tipo == 'agenda') {
      this.agenda = this.navParams.get('agenda');
      this.puedeRevocar = this.navParams.get('puede_revocar');
      this.agendaRevocada = this.agenda.estado_agenda == '0';
      console.log(this.agendaRevocada);
    }
    console.log(this.agenda);
  }

  ionViewDidLoad() {
  }

  atras(){
    this.navCtrl.pop();
  }

  revocarAlert(){
    this.alertCtrl.create({
      title:'Revocar Agenda',
      subTitle: '¿Desea revocar esta agenda?',
      buttons:[
        {
          text:'Aceptar',
          handler: () => {
            this.revocarAgenda()
          } 
        },{
          text:'Cancelar'
        }
      ]
    }).present();
  }
  revocarAgenda(){
    this.loading = this.loadCtrl.create({
      content:'Por favor espere'
    });
    this.loading.present();
    let data = {
      id_agenda:this.agenda.id_agenda,
      id_bitacora:this.agenda.id_bitacora
    };
    let headers = new Headers(
      { 
        'Content-Type': 'application/json; charset=UTF-8'
      });
    let options = new RequestOptions( {method: RequestMethod.Put, headers: headers });
    this.http.put(this.url.url + 'api/v1/Agenda', JSON.stringify(data),options)
      .subscribe(data => {
        this.alertCtrl.create({
          title:'Agenda revocada',
          subTitle:'Agenda revocada con exito',
          buttons:[
            {
              text:'Aceptar',
              handler: () => {
                this.loading.dismiss();
                this.viewCtrl.dismiss({
                  agenda_revocada:true
                })
              }
            }
          ]
        }).present();
      });
  }
}
