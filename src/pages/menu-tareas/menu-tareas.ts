import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  ViewController, 
  ModalController, 
  AlertController,
  App } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the MenuTareasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-menu-tareas',
  templateUrl: 'menu-tareas.html',
})
export class MenuTareasPage {

  tarea:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private modalCtrl:ModalController,
    private http:Http,
    private url:UrlProvider,
    private alertCtrl:AlertController,
    private app:App) {
    this.tarea = this.navParams.get('tarea');
  }

  ionViewDidLoad() {
  }
  close(){
    this.viewCtrl.dismiss();
  }
  verDetalle(){
    this.modalCtrl.create('BitacoraDetalleModalPage',{
      detalle:this.tarea.detalle_tarea
    }).present();
  }
  cerrarTarea(){
    this.http.get(this.url.url + 'api/v1/CerrarTarea/' + this.tarea.id_tarea)
      .subscribe(data => {
        if (data.status == 200) {
          this.app.getRootNav().setRoot('TareasPage');
          this.viewCtrl.dismiss();
          this.presentToast('La tarea se a cerrado correctamente');
        }
      });
  }
  presentToast(title) {
    this.alertCtrl.create({
      title: 'Tarea',
      subTitle: title,
      buttons:['Aceptar']
    }).present();
  }
}
