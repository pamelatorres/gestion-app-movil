import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  ToastController,
  AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { PersonasDataProvider } from '../../providers/personas-data/personas-data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

/**
 * Generated class for the VbPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vb',
  templateUrl: 'vb.html',
})
export class VbPage {

  palabraClave = '';
  busquedaControl: FormControl;
  bitacora:any;
  user:any;
  detalle:string;
  monto:any = 0;
  puedeMostratLista = false;
  items:any;
  buscando: any = false;
  itemSeleccionado:number;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private toastCtrl:ToastController,
    private storage:Storage,
    private alertCtrl:AlertController,
    private personasData:PersonasDataProvider) {

    this.busquedaControl = new FormControl();
    this.bitacora = this.navParams.get('bitacora');
    if (this.bitacora.id_bitacora_derivacion == 0){
      this.puedeMostratLista = true;
      this.setFilteredItems();
      this.busquedaControl.valueChanges.debounceTime(700).subscribe(busqueda => {
        this.buscando = false;
        this.setFilteredItems();
      });
    }
    this.storage.get('user')
      .then(user => {
        this.user = user;
      });
  }

  ionViewDidLoad() {
    
  }

  guardar(){
    let responsable;
    if (this.items != null){
      responsable = this.items[this.itemSeleccionado].id_usuario;
    }else{
      responsable = 0;
    }
    let data = {
      accion: 1,
      id_vb:null,
      id_bitacora:this.bitacora.id_bitacora,
      detalle_vb: this.detalle,
      monto_vb: this.monto,
      solicitante: this.user.id_usuario,
      responsable: responsable
    };
    this.http.post(this.url.url + 'api/v1/VistoBueno', JSON.stringify(data))
      .subscribe(data => {
        console.log(data);
        if(data.status == 201){
          this.navCtrl.pop();
          this.presentToast('Se ha creado la petición de visto bueno');
        }
      });
  }

  presentToast(title) {
    this.alertCtrl.create({
      title: 'Visto bueno',
      subTitle:'Se ha creado un visto bueno',
      message: 'Debe esperar a que se autorize',
      buttons: [
        {
          text:'Aceptar'
        }
      ]
    }).present();
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
}
