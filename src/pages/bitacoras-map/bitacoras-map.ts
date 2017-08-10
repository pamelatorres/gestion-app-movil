import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the BitacorasMapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-bitacoras-map',
  templateUrl: 'bitacoras-map.html',
})
export class BitacorasMapPage {

  map: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private storage:Storage,
    public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    this.geolocation.getCurrentPosition()
      .then(position => {
        let latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        let mapOptions = {
          center: latlng,
          zoom: 18
        };
        this.map = new google.maps.Map(element,mapOptions);
        this.storage.get('user')
          .then(user =>{
            this.getIncidentes(user);
          });
      });
  }

  getIncidentes(user){
    this.http.get(this.url.url + 'api/v1/Bitacoras/' + user.id_usuario + '/1')
      .subscribe(data => {
        data.json().forEach((bitacora,i) => {
          let latlng = new google.maps.LatLng(+ bitacora.latitud, + bitacora.longitud);
          let markerString = bitacora.nombre_responsabilidad + '<br>' + bitacora.fecha_creacion;
          let infoWidow = new google.maps.InfoWindow({
            content: markerString
          });
          let marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.Drop,
            position: latlng,
            title: 'fsdlnfkls'
          });
          marker.addListener('click',function () {
            infoWidow.open(this.map, marker);
          });
          if(i == data.json().length -1){
            this.map.panTo(latlng);
          }
        });
      });
  }
}
