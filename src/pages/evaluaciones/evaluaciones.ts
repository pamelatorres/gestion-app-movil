import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController,AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the EvaluacionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-evaluaciones',
  templateUrl: 'evaluaciones.html',
})
export class EvaluacionesPage {

  incidentes = new Array;
  evaluacionesGuardadas = new Array;
  userId:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private popOverMenu:PopoverController,
    private storage:Storage,
    private alertCtrl:AlertController) {
    this.storage.get('evaluaciones')
      .then(evaluaciones => {
        this.evaluacionesGuardadas = new Array;
        this.evaluacionesGuardadas = evaluaciones;
      });
    this.storage.get('user')
      .then(user => {
        this.userId = user.id_usuario;
        this.cargarIncidentes();
      });
  }

  ionViewDidLoad() {
  }

  cargarIncidentes(){
    this.http.get(this.url.url + 'api/v1/evaluaciones/' + this.userId)
      .subscribe(data => {
        console.log(data.json());
        if(data.status >= 200 && data.status < 300)
          data.json().forEach(incidente => {
            if(this.evaluacionesGuardadas != null){
              this.evaluacionesGuardadas.forEach(evaluacion => {
                //console.log(evaluacion);
                if(+ evaluacion.id_incidente == + incidente.id_incidente){
                  incidente.total = evaluacion.total;
                  incidente.evaluacion = evaluacion;
                }
              });
            }
            this.incidentes.push(incidente);
          });
      });
  }
  mostrarMenu(id){
    this.popOverMenu.create('MenuEvaluacionesPage',{
      id_incidente: id
    }).present();
  }
  evaluarIncidente(id_incidente,id_evaluacion){
    this.http.get(this.url.url + 'api/v1/BitacoraIncidente/' + id_incidente)
      .subscribe(data => {
        this.navCtrl.push('BitacoraPage',{
          bitacora: data.json(),
          id_incidente: id_incidente,
          id_evaluacion: id_evaluacion
        });
      });
  }
  filalizarEvaluacion(evaluacion){
    this.alertCtrl.create({
      title: 'Alerta',
      subTitle: 'Desea finalizar esta evaluación',
      buttons:[
        {
          text:'Aceptar',
          handler: () => {
            this.postEvaluacion(evaluacion);
          }
        },{
          text: 'Cancelar'
        }
      ]
    }).present();
  }
  postEvaluacion(evaluacion){
    let data = {
      var_id_evaluacion: evaluacion.id_evaluacion,
      var_puntos_calidad: evaluacion.puntos_calidad,
      var_puntos_solucion: evaluacion.puntos_solucion,
      var_puntos_tiempo: evaluacion.puntos_tiempo
    }
    this.http.post(this.url.url + 'api/v1/Evaluaciones',JSON.stringify(data))
      .subscribe(data => {
        if(data.json()){
          this.alertCtrl.create({
            title: 'Evaluación',
            subTitle: 'Evaluación finalizada con exito'
          }).present();
          this.navCtrl.setRoot('EvaluacionesPage');
        }
      });
  }
  editarEvaluacion(id_incidente, id_evaluacion ,evaluacion){
    this.navCtrl.push('EvaluacionPage',{
      id_incidente: id_incidente,
      id_evaluacion: id_evaluacion,
      evaluacion: evaluacion
    });
  }
}
