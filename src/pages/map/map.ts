import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';

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

  map: any;
  markers: any = new Array();
  public mostrarBoton: boolean = false;
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
    private storage:Storage) {
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

      let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latlng,
        zoom: 18
      };
      this.map = new google.maps.Map(element,mapOptions);
      google.maps.event.addListener(this.map, 'click', (mouseEvent) => {
        this.addMarker(mouseEvent.latLng);
      });
      //console.log(this.map);
    });
  }

  addMarker(latlng){
    if (this.markers.length > 0) {
      this.clearOverlays();
    }
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.Drop,
      position: latlng
    });
    this.mostrarBoton = true;
    this.markers.push(marker);
    this.cdRef.detectChanges();
  }

  clearOverlays(){
    for (var i = 0; i < this.markers.length; i++ ) {
      this.markers[i].setMap(null);
    }
    this.markers.length = 0;
  }

  confirmAlert() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar incidente',
      message: '¿Desea generar este incidente?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            //console.log('No');
          }
        },
        {
          text: 'Si',
          handler: () => {
            this.crearIncidente();
          }
        }
      ]
    });
    alert.present();
  }

  crearIncidente(){
    //let headers = new Headers({ 'Content-Type': 'application/json' });
    //let options = new RequestOptions(headers);
    let latLng = this.markers[this.markers.length -1].position;
    let data = {
      id_usuario_informante: this.user.id_usuario,
      id_responsabilidad: this.responsabilidad,
      latitud: latLng.lat(),
      longitud: latLng.lng()
    };
    //console.log(data);
    this.http.post(this.url.url + 'api/v1/incidentes', JSON.stringify(data))
      .subscribe(data => {
        if (data.status == 201) {
          this.presentToast('Incidente generado exitosamente');
          this.navCtrl.push('DocumentacionPage',{
            id_incidente: data.json().r
          }).then(() => {
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

  presentToast(title) {
    let toast = this.toastCtrl.create({
      message: title,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }
}
