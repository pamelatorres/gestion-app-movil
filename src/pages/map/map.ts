import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  AlertController, 
  ViewController, 
  ToastController,
  LoadingController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

//import { ResponsabilidadesPage } from '../responsabilidades/responsabilidades';

declare var google;

/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {

  map: GoogleMap;
  markers: any = new Array();
  sectores_markers: any = new Array();
  mostrarBoton: boolean = false;
  responsabilidad: any;
  user:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public geolocation: Geolocation,
    private cdRef:ChangeDetectorRef,
    private alertCtrl: AlertController,
    public http: Http,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private url:UrlProvider,
    private storage:Storage,
    private googleMaps: GoogleMaps,
    private loadCtrl:LoadingController) {
    this.storage.get('user')
      .then(user => this.user = user);
    this.responsabilidad = + this.navParams.get('responsabilidad');
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad MapPage');
  }

  ngAfterViewInit(){
  	this.loadMap();
  }

  loadMap(){

    let element: HTMLElement = document.getElementById('map');
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng:LatLng = new LatLng(position.coords.latitude, position.coords.longitude);
      this.map = this.googleMaps.create(element);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log(this.map);
          this.map.animateCamera({
            target: latLng,
            zoom: 18
          });
          this.cargarSectoresCerrados();
          this.map.on(GoogleMapsEvent.MAP_CLICK)
            .subscribe(data => {
              this.addMarker(data);
            });
        });
    });
  }

  cargarSectoresCerrados(){
    this.http.get(this.url.url + 'api/v1/CerrarSector')
      .subscribe(data => {
        this.sectores_markers = data.json();
        this.sectores_markers.forEach(sector => {
          let latLng = new LatLng(+ sector.latitud_sc, + sector.longitud_sc);
          let markerOptions:MarkerOptions = {
            position:latLng,
            title:'Sector cerrado',
            icon: {
              url:'www/img/bloqueo_incidentes.png',
              size: {
                width:94,
                height:94
              }
            }
          };
          this.map.addMarker(markerOptions)
            .then((marker: Marker) => {

              //marker.showInfoWindow();
            });
        });
      });
  }

  addMarker(latlng){
    if (this.markers.length > 0) {
      this.clearOverlays();
    }
    let markerOptions:MarkerOptions = {
      position:latlng,
      title:'Ubicación del incidente'
    };
    this.map.addMarker(markerOptions)
      .then((marker:Marker) => {
        this.markers.push(marker);
        //console.log(marker.getPosition());
      });
    this.mostrarBoton = true;
  }

  clearOverlays(){
    for (var i = 0; i < this.markers.length; i++ ) {
      this.markers[i].remove();
    }
    this.markers.length = 0;
  }

  confirmAlert() {
    this.map.setClickable(false);
    let alert = this.alertCtrl.create({
      title: 'Confirmar incidente',
      message: '¿Desea generar este incidente?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            this.map.setClickable(true);
            //console.log('No');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.markers[this.markers.length -1].getPosition()
              .then(latLng => {
                this.crearIncidente(latLng);
              });
          }
        }
      ]
    });
    alert.present();
  }

  crearIncidente(latLng){
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions(headers);
    let loading = this.loadCtrl.create({
      content:'Por favor espere'
    });
    loading.present();
    let data = {
      id_usuario_informante: this.user.id_usuario,
      id_responsabilidad: this.responsabilidad,
      latitud: latLng.lat,
      longitud: latLng.lng
    };
    //console.log(data);
    this.http.post(this.url.url + 'api/v1/incidentes', JSON.stringify(data))
      .subscribe(data => {
        if (data.status >= 200) {
          loading.dismiss();
          //this.presentToast('Incidente generado exitosamente');
          this.presentAlert();
          this.navCtrl.push('DocumentacionPage',{
            id_incidente: data.json().r
          }).then(() => {
              this.map.setClickable(true);
              this.clearOverlays();
              // first we find the index of the current view controller:
              const index = this.viewCtrl.index;
              // then we remove it from the navigation stack
              this.navCtrl.remove(index);
              this.navCtrl.remove(index -1);
            });
          }
    });
    //console.log(data);
  }

  presentAlert() {
    this.alertCtrl.create({
      title:'Gestión Municipio',
      subTitle:'El incidente ha sido creado satisfactoriamente',
      message:'Ahora puede anexar archivos',
      buttons:[
        {
          text:'Aceptar'
        }
      ]
    }).present();
  }
}
