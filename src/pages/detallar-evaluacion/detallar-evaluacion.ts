import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http'

@IonicPage()
@Component({
  selector: 'page-detallar-evaluacion',
  templateUrl: 'detallar-evaluacion.html',
})
export class DetallarEvaluacionPage {

  detalle:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
  }
  guardar(){
    let data = {
      id_evaluacion: this.navParams.get('id_evaluacion'),
      detalle: this.detalle
    }
    this.http.post(this.url.url + 'api/v1/DetallarEvaluacion',JSON.stringify(data))
      .subscribe(data => {
        console.log(data.json());
        this.alertCtrl.create({
          title:'Evaluación',
          subTitle: 'Detalle gurdado con exito',
          buttons:[
            {
              text:'Aceptar'
            }
          ]
        }).present();
        this.navCtrl.setRoot('EvaluacionesPage');
      });
  }
}
