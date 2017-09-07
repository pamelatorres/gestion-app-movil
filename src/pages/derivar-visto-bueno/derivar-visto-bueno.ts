import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { PersonasDataProvider } from '../../providers/personas-data/personas-data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DerivarVistoBuenoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-derivar-visto-bueno',
  templateUrl: 'derivar-visto-bueno.html',
})
export class DerivarVistoBuenoPage {

  palabraClave = '';
  items:any;
  buscando: any = false;
  itemSeleccionado:number;
  vb:any;
  derivarA:any = null;
  clasificaciones:any;
  departamento:any;
  busquedaControl: FormControl;
  user:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private personasData:PersonasDataProvider,
    private http:Http,
    private url:UrlProvider,
    private alertCtrl:AlertController,
    private toastCtrl:ToastController,
    private storage:Storage) {
    this.vb = this.navParams.get('vb');
    //this.obtenerClasificaciones();
    this.busquedaControl = new FormControl();
    this.storage.get('user')
      .then(user => {
        this.user = user;
      });
    console.log(this.vb);
  }

  ionViewDidLoad() {
    this.setFilteredItems();
    this.busquedaControl.valueChanges.debounceTime(700).subscribe(busqueda => {
      this.buscando = false;
      this.setFilteredItems();
    });
  }

  onChange(){
    console.log(this.departamento);
  }

  onSearchInput(){
    this.buscando = true;
  }

  setFilteredItems(){
    this.items = this.personasData.filtrarDatos(this.palabraClave,1);
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
    let data = {
      accion: 2,
      id_vb:this.vb.id_vb,
      id_bitacora:null,
      detalle_vb: this.vb.detalle_vb,
      monto_vb: this.vb.monto_vb,
      solicitante: this.user.id_usuario,
      responsable: this.items[this.itemSeleccionado].id_usuario
    };
    this.http.post(this.url.url + 'api/v1/VistoBueno', JSON.stringify(data))
      .subscribe(data => {
        console.log(data);
        if(data.status == 201){
          this.navCtrl.pop();
          this.presentAlert();
        }
      });
  }
  presentAlert() {
    this.alertCtrl.create({
      title:'Derivación de visto bueno',
      subTitle:'El visto bueno se ha deriva exitosamente',
      buttons:[
        {
          text:'Aceptar',
          handler:() => {
            this.navCtrl.setRoot('VbsPage');
          }
        }
      ]
    }).present();
  }
}
