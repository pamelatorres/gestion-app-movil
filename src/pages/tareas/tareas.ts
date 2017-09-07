import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  ModalController, 
  PopoverController, 
  ToastController
} from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the TareasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tareas',
  templateUrl: 'tareas.html',
})
export class TareasPage {

  tareas:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private storage:Storage,
    private url:UrlProvider,
    private modalCtrl:ModalController,
    private popoverCtrl:PopoverController,
    private toastCtrl:ToastController) {
    this.storage.get('user')
      .then(user => {
        this.obtenerTareas(user.id_usuario);
      });
  }

  ionViewDidLoad() {
  }

  obtenerTareas(idUsuario){
    this.http.get(this.url.url + 'api/v1/Tareas/' + idUsuario + '/0')
      .subscribe(data => {
        if (data.status == 200) {
          this.tareas = data.json();
        }
      });
  }
  abrirDetalle(detalle){
    this.modalCtrl.create('BitacoraDetalleModalPage',{
      detalle:detalle
    }).present();
  }
  presentPopover(myEvent, tarea) {
    let popover = this.popoverCtrl.create('MenuTareasPage',{
      tarea: tarea
    });
    popover.present({
      ev: myEvent
    });
  }
  verDetalle(tarea){
    this.modalCtrl.create('BitacoraDetalleModalPage',{
      detalle: tarea.detalle_tarea
    }).present();
  }
  cerrarTarea(tarea){
    this.navCtrl.push('CerrarTareaPage',{
      tarea:tarea
    });
  }
  presentToast(title) {
    this.toastCtrl.create({
      message:title,
      duration: 3000
    }).present();
  }
}
