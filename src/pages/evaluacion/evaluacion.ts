import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http } from '@angular/http'
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EvaluacionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-evaluacion',
  templateUrl: 'evaluacion.html',
})
export class EvaluacionPage {

  cargarProgreso: number = 0;
  preguntas:any;
  index:number = 0;
  titulo:string;
  detalle:string;
  puedeMostrarEstrellas:boolean = false;
  puedeMostrarAccion:boolean = false;
  puedeMostarPorcentaje:boolean = false;
  puedeMostrarControles:boolean = true;
  puedeMostrarResultadoFinal:boolean = false;
  puedeMostrarBotonGuardar:boolean = false;
  puntosTiempo:number;
  puntosSolucion:number;
  puntosCalidad:number;
  numerosDePreguntas:number;
  porcentaje:number;
  accion:any;
  estrellas:number;
  total:number;
  userId:number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private alertCtrl:AlertController,
    private storage:Storage) {
    this.cargarPreguntas();
    this.storage.get('user')
      .then(user => {
        this.userId = user.id_usuario
      });
  }

  ionViewDidLoad() {
    let evaluacion = this.navParams.get('evaluacion');
    if(evaluacion){
      this.estrellas = evaluacion.estrellas,
      this.accion = evaluacion.solucion,
      this.porcentaje = evaluacion.calidad
    }
  }

  atras(){
    if((this.cargarProgreso - Math.round(100/this.numerosDePreguntas)) >= 0){
      this.cargarProgreso -= Math.round(100/this.numerosDePreguntas);
      this.index--;
      this.puedeMostrarControles = true;
      this.puedeMostrarResultadoFinal = false;
      this.puedeMostrarBotonGuardar = false;
      this.mostrarPreguntas(this.index);
    }
  }

  siguiente(){
    if((this.cargarProgreso + Math.round(100/this.numerosDePreguntas)) <= 100){
      this.cargarProgreso += Math.round(100/this.numerosDePreguntas);
      this.index++;
      this.mostrarPreguntas(this.index);
    }
  }
  cargarPreguntas(){
    this.http.get(this.url.url + 'api/v1/PreguntasEvaluacion')
      .subscribe(data => {
        if(data.status >= 200){
          console.log(data);
          this.preguntas = data.json();
          this.numerosDePreguntas = this.preguntas.length;
          this.mostrarPreguntas(this.index);
        }
      });
  }
  mostrarPreguntas(index){
    if(index < this.numerosDePreguntas){
      switch (this.preguntas[index].simbolo_tipo) {
        case "estrella":
          this.puedeMostrarEstrellas = true;
          this.puedeMostrarAccion = false;
          this.puedeMostarPorcentaje = false;
          break;
        case "accion":
          this.puedeMostrarAccion = true;
          this.puedeMostrarEstrellas = false;
          this.puedeMostarPorcentaje = false;
          break;
        case "porcentaje":
          this.puedeMostarPorcentaje = true;
          this.puedeMostrarEstrellas = false;
          this.puedeMostrarAccion = false;
          break;
        default:
          // code...
          break;
      }
      this.titulo = this.preguntas[index].nombre_parametro;
      this.detalle = this.preguntas[index].detalle_parametro;
    }else{
      // cambiar porcentajes de valores a dinamicos que estan en la base de datos
      this.puntosSolucion = this.accion.localeCompare('true') ? 0 : 10;
      this.puntosTiempo = (this.porcentaje * 50) / 100;
      this.puntosCalidad = ((this.estrellas * 100) / 5 * 40) / 100;
      this.total = this.puntosSolucion + this.puntosTiempo + this.puntosCalidad;
      this.puedeMostrarControles = false;
      this.puedeMostrarResultadoFinal = true;
      this.puedeMostrarBotonGuardar = true;
    }
  }

  guardarEvaluacion(){
    let data = {
      id_incidente: this.navParams.get('id_incidente'),
      id_evaluacion: this.navParams.get('id_evaluacion'),
      id_persona_evaluadora: this.userId,
      puntos_solucion: this.puntosSolucion,
      puntos_tiempo: this.puntosTiempo,
      puntos_calidad: this.puntosCalidad,
      estrellas: this.estrellas,
      solucion: this.accion,
      calidad: this.porcentaje,
      total: this.total
    }
    this.storage.get('evaluaciones')
      .then(evaluaciones =>{
        if(evaluaciones == null){
          evaluaciones = new Array;
        }
        evaluaciones.push(data);
        this.storage.set('evaluaciones',evaluaciones)
          .then(()=>{
            this.alertCtrl.create({
              title: 'Evaluación',
              subTitle: 'Evaluación guardada correctamente',
              buttons:[
                {
                  text:'Aceptar'
                }
              ]
            }).present();
            this.navCtrl.push('DetallarEvaluacionPage',{
              id_evaluacion: this.navParams.get('id_evaluacion')
            });
          });
      });
  }
}
