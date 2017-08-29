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

  textos = Array();
  docs:any;
  fotos = Array();
  videos = Array();
  documentos = Array();
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
  tipo_accion:boolean;
  loading:any;

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
    this.getDocs();
    this.getTareas();
    this.getVistosBuenos();
    this.evaluacion = this.navParams.get('id_evaluacion');
    this.calculoDias(this.bitacora.id_incidente);
    this.tipo_accion = this.navParams.get('tipo_accion') == '0';
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

  getDocs(){
    this.http.get(this.url.url + 'api/v1/documentacion/' + this.bitacora.id_incidente)
      .subscribe(data => {
          let datajson = data.json();
          for(var i = datajson.length - 1; i >= 0; i--) {
            let doc = datajson[i];
            switch (doc.tipo_anexo) {
              case "foto":
                this.fotos.push(doc);
                break;
              case "video":
                this.videos.push(doc);
                break;
              case "documento":
                this.documentos.push(doc);
                break;
              case "texto":
                this.textos.push(doc);
              default:
                // code...
                break;
            }
          };
      });
  }


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
      bitacora: this.bitacora
    }).then(()=> {
      this.loading.dismiss();
    });
  }

  irACrearBitacora(){
    let push = this.navCtrl.push('CrearBitacoraPage',{
      id_bitacora:this.bitacora.id_bitacora,
      bitacora: this.bitacora,
      tareas:this.tareas
    });
  }

  abrirDetalle(){
    let detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage',{
      detalle: this.bitacora.observacion,
      titulo: this.bitacora.titulo
    });
    detalleModal.present();
  }
  getTareas(){
    this.http.get(this.url.url + 'api/v1/Tareas/' + this.bitacora.id_bitacora + '/1')
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
        this.responsableActual = this.calculoDiasData[this.calculoDiasData.length - 1].responsable
      });
  }
  abrirToast(mensaje){
    this.toastCtrl.create({message:mensaje, duration:3000}).present();
  }

  openImage(url){
    this.imageViewer.show(this.url.url + 'api/v1/ServeImages/' + encodeURIComponent(url).slice(0,-4));
  }
}
