import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google; 
@IonicPage()
@Component({
  selector: 'page-bitacora-mapa',
  templateUrl: 'bitacora-mapa.html',
})
export class BitacoraMapaPage {

  bitacora:any;
  map:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bitacora = this.navParams.get('bitacora');
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap(){
    let element: HTMLElement = document.getElementById('map');
    let latlng = new google.maps.LatLng(this.bitacora.latitud, this.bitacora.longitud);

    let mapOptions = {
      center: latlng,
      zoom: 18
    };
    this.map = new google.maps.Map(element,mapOptions);
    let markerString = this.bitacora.nombre_responsabilidad + '<br>' + this.bitacora.fecha_creacion;
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
  }
}
