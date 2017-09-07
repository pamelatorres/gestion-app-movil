import { Component } from '@angular/core';
import { IonicPage, 
          NavController,
          NavParams, 
          ModalController, 
          AlertController, 
          ToastController,
          PopoverController,
          Platform,
          LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';

/**
 * Generated class for the BitacoraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bitacora',
  templateUrl: 'bitacora.html',
})
export class BitacoraPage {

  incidente = 50;
  shownGroup = null;
  tareas:any = new Array;
  tareasPendientes:number = 0;
  vbsPendientes:number = 0;
  vbs:any = new Array;
  bitacora:any;
  evaluacion:any;
  calculoDiasData:any = {};
  diasTotales:any;
  responsablePrincipal:any;
  responsableActual:string;
  departamentoActual:string;
  fechaActual:string;
  tipo_accion:boolean;
  loading:any;
  verLista1 = true;
  verLista2 = true;
  iconoLista1 = 'arrow-up';
  iconoLista2 = 'arrow-up';
  agendasPendientes = 0;
  responsable:boolean = false;

	now: string = new Date().toJSON();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private modalCtrl:ModalController,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private popOverCtrl:PopoverController,
    private storage:Storage,
    private platform:Platform,
    private imageViewer:PhotoViewer,
    private loadCtrl:LoadingController) {
    this.bitacora = this.navParams.get('bitacora');
    this.getTareas();
    this.getVistosBuenos();
    this.evaluacion = this.navParams.get('id_evaluacion');
    this.calculoDias(this.bitacora.id_incidente);
    this.tipo_accion = this.navParams.get('tipo_accion') == '0';
    this.cargarEventos();
    this.storage.get('user')
      .then(user => {
        this.responsable = this.bitacora.id_usuario_responsable == user.id_usuario;
      });
  }

  ionViewDidLoad() {

  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  getData = (data) => {
    return new Promise((resolve, reject) => {
      this.bitacora.titulo = data.titulo;
      this.bitacora.observacion = data.observacion;
    });
  }

  irADetallarBitacora(){
    this.navCtrl.push('DetallarBitacoraPage',{
      id_bitacora:this.bitacora.id_bitacora,
      bitacora: this.bitacora,
      callback: this.getData
    });
  }

  irA(page) {
    this.loading = this.loadCtrl.create({
      content:'Por favor espere'
    });
    this.loading.present();
    this.navCtrl.push(page,{
      id_bitacora:this.bitacora.id_bitacora,
      bitacora: this.bitacora,
      id_incidente:this.bitacora.id_incidente
    }).then(()=> {
      this.loading.dismiss();
    });
  }

  irACrearBitacora(){
    this.navCtrl.push('CrearBitacoraPage',{
      id_bitacora:this.bitacora.id_bitacora,
      bitacora: this.bitacora,
      tareas_pendientes:this.tareasPendientes
    });
  }

  abrirDetalle(){
    let detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage',{
      id_incidente:this.bitacora.id_incidente,
      tipo:'bitacora-detalle',
      color_alerta:this.bitacora.color_alerta
    });
    detalleModal.present();
  }
  getTareas(){
    this.http.get(this.url.url + 'api/v1/Tareas/' + this.bitacora.id_incidente + '/1')
      .subscribe(data => {
        console.log(data);
        if (data.status >= 200) {
          this.tareas = data.json();
          this.tareas.forEach(tarea => {
            if(tarea.estado_tarea == 1)
              this.tareasPendientes ++;
          });
        }
      });
  }

  getVistosBuenos(){
    this.http.get(this.url.url + 'api/v1/VistoBueno/' + this.bitacora.id_bitacora + '/0')
      .subscribe(data => {
        if (data.status >= 200) {
          this.vbs = data.json();
          this.vbs.forEach(vb => {
            if(vb.aprueba_vb == null)
              this.vbsPendientes ++;
          });
        }
      });
  }

  abrirMenuVB(ev,vb){
    if(this.platform.is('cordava') && vb.aprueba_vb == null){
      this.storage.get('user')
        .then(user => {
          if(user.id_usuario != vb.id_usuario_vb){
            this.popOverCtrl.create('VbMenuPage',{
              vb:vb
            }).present({ev:ev});
          }
        });
    }else{
      this.popOverCtrl.create('VbMenuPage',{
        vb: vb
      }).present({ev:ev});
    }
  }
  irAEvaluacion(){
    this.navCtrl.push('EvaluacionPage',{
      id_incidente: this.navParams.get('id_incidente'),
      id_evaluacion: this.navParams.get('id_evaluacion')
    });
  }

  calculoDias(idIncidente){
    this.http.get(this.url.url + 'api/v1/CalculoDias/' + idIncidente)
      .subscribe(data => {
        console.log(data);
        this.calculoDiasData = data.json();
        this.diasTotales = this.calculoDiasData[0].dias_totales;
        this.responsablePrincipal = this.calculoDiasData[0].responsable;
        this.responsableActual = this.calculoDiasData[this.calculoDiasData.length - 1].responsable;
        this.departamentoActual = this.calculoDiasData[this.calculoDiasData.length -1].depto_responsable
        this.fechaActual = this.calculoDiasData[this.calculoDiasData.length -1].finicio_responsable
      });
  }
  abrirToast(mensaje){
    this.toastCtrl.create({message:mensaje, duration:3000}).present();
  }

  openImage(url){
    this.imageViewer.show(this.url.url + 'api/v1/ServeImages/' + encodeURIComponent(url).slice(0,-4));
  }
  verProtocolo(){
    console.log(this.bitacora);
    this.modalCtrl.create('BitacoraDetalleModalPage',{
      detalle:this.bitacora.descripcion_manual,
      bitacora:this.bitacora
    }).present();
  }
  desplegarLista(lista){
    if (lista == 1) {
      this.verLista1 = !this.verLista1;
      if (!this.verLista1) {
        this.iconoLista1 = 'arrow-down';
      }else{
        this.iconoLista1 = 'arrow-up';
      }
    }else{
      this.verLista2 = !this.verLista2;
      if (!this.verLista2) {
        this.iconoLista2 = 'arrow-down';
      }else{
        this.iconoLista2 = 'arrow-up';
      }
    }
  }

  cargarEventos(){
    this.http.get(this.url.url + 'api/v1/Agenda/' + this.bitacora.id_incidente)
      .subscribe(data => {
        if (data.status == 200) {
          data.json().forEach((agenda, index) => {
            let revocada = agenda.estado_agenda == '0' ? '(Agenda revocada)' : '';
            let title = agenda.titulo + ' ' + revocada;
            let fechaInicio = new Date(agenda.fecha_inicio);
            let fechaTermino = new Date(agenda.fecha_termino);
            let ahora = new Date();
            if (ahora < fechaTermino) {
              this.agendasPendientes ++;
            }
          });
        }
      });
  }
}
