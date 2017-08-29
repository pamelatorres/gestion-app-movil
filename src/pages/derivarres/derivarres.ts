import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  ToastController,
  LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { PersonasDataProvider } from '../../providers/personas-data/personas-data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
 
/**
 * Generated class for the DerivarresPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-derivarres',
  templateUrl: 'derivarres.html',
})
export class DerivarresPage {
  
  palabraClave = '';
  items:any;
  buscando: any = false;
  itemSeleccionado:number;
  bitacora:any;
  derivarA:any = null;
  clasificaciones:any;
  departamento:any;
  busquedaControl: FormControl;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private personasData:PersonasDataProvider,
    private http:Http,
    private url:UrlProvider,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private storage:Storage,
    private loadCtrl:LoadingController) {
    this.bitacora = this.navParams.get('bitacora');
    //this.obtenerClasificaciones();
    this.busquedaControl = new FormControl();
    console.log(this.bitacora);
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.busquedaControl.valueChanges.debounceTime(700).subscribe(busqueda => {
      this.buscando = false;
      this.setFilteredItems();
    });
  }

  obtenerClasificaciones(){
    this.http.get(this.url.url + 'api/v1/clasificaciones')
      .subscribe(data => {
        if (data.status == 200) {
          this.clasificaciones = data.json();
        }
      });
  }

  onChange(){
    console.log(this.departamento);
  }

  obtenerUsuario(){
    this.http.get(this.url.url + 'api/v1/responsables')
      .subscribe(data => {
        if (data.status == 200) {
          
        }
      });
  }

  onSearchInput(){
    this.buscando = true;
  }

  setFilteredItems(){
    this.items = this.personasData.filtrarDatos(this.palabraClave,2);
  }

  seleccionarUsuario(idUsuario,i){
    this.itemSeleccionado = i;
  }

  seleccionado(index):boolean{
    return index === this.itemSeleccionado;
  }

  crearAlert(){
    this.alertCtrl.create({
      title: 'Alerta',
      subTitle:'¿Desea derivar esta bitacora?',
      message: 'Al derivar ya no podrá seguir modificando la bitacora',
      buttons: [
        {
          text:'Aceptar',
          handler: () => {
            this.derivar();
          }
        },
        {
          text:'Cancelar',
          role:'cancel'
        }
      ]
    }).present();
  }
  derivar(){
    let loading = this.loadCtrl.create({
      content:'Por favor espere'
    });
    loading.present();
    this.storage.get('user')
      .then(user => {
        let data = {
          id_usuario: user.id_usuario,
          id_bitacora: this.navParams.get('id_bitacora'),
          id_usuario_responsable: this.items[this.itemSeleccionado].id_usuario,
          id_incidente: this.bitacora.id_incidente
        };
        this.http.post(this.url.url + 'api/v1/Derivar',JSON.stringify(data))
          .subscribe(data => {
            loading.dismiss();
            if (data.status == 200 && data.json().r == 1) {
              this.navCtrl.setRoot('HomePage');
              this.presentAlert();
            }else{
              this.presentToast('Hay tareas pendientes, finalize las para poder derivar la bitacora');          
            }
          });
      });
  }
  presentToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 4000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }
  presentAlert() {
    this.alertCtrl.create({
      title:'Gestión Municipio',
      subTitle:'La bitacora ha sido derivada satisfactoriamente',
      buttons:[
        {
          text:'Aceptar'
        }
      ]
    }).present();
  }
}
