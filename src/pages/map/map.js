var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
import { GoogleMaps, GoogleMapsEvent, LatLng } from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MapPage = (function () {
    function MapPage(navCtrl, navParams, geolocation, cdRef, alertCtrl, http, viewCtrl, toastCtrl, url, storage, googleMaps) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.cdRef = cdRef;
        this.alertCtrl = alertCtrl;
        this.http = http;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.url = url;
        this.storage = storage;
        this.googleMaps = googleMaps;
        this.markers = new Array();
        this.sectores_markers = new Array();
        this.mostrarBoton = false;
        this.storage.get('user')
            .then(function (user) { return _this.user = user; });
        this.responsabilidad = +this.navParams.get('responsabilidad');
    }
    MapPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad MapPage');
    };
    MapPage.prototype.ngAfterViewInit = function () {
        this.loadMap();
    };
    MapPage.prototype.loadMap = function () {
        var _this = this;
        var element = document.getElementById('map');
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new LatLng(position.coords.latitude, position.coords.longitude);
            _this.map = _this.googleMaps.create(element);
            _this.map.one(GoogleMapsEvent.MAP_READY)
                .then(function () {
                console.log(_this.map);
                _this.map.animateCamera({
                    target: latLng,
                    zoom: 18
                });
                _this.cargarSectoresCerrados();
                _this.map.on(GoogleMapsEvent.MAP_CLICK)
                    .subscribe(function (data) {
                    _this.addMarker(data);
                });
            });
        });
    };
    MapPage.prototype.cargarSectoresCerrados = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/CerrarSector')
            .subscribe(function (data) {
            _this.sectores_markers = data.json();
            _this.sectores_markers.forEach(function (sector) {
                var latLng = new LatLng(+sector.latitud_sc, +sector.longitud_sc);
                var markerOptions = {
                    position: latLng,
                    title: 'Sector cerrado',
                    icon: {
                        url: 'www/img/bloqueo_incidentes.png',
                        size: {
                            width: 94,
                            height: 94
                        }
                    }
                };
                _this.map.addMarker(markerOptions)
                    .then(function (marker) {
                    //marker.showInfoWindow();
                });
            });
        });
    };
    MapPage.prototype.addMarker = function (latlng) {
        var _this = this;
        if (this.markers.length > 0) {
            this.clearOverlays();
        }
        var markerOptions = {
            position: latlng,
            title: 'Ubicación del incidente'
        };
        this.map.addMarker(markerOptions)
            .then(function (marker) {
            _this.markers.push(marker);
            //console.log(marker.getPosition());
        });
        this.mostrarBoton = true;
    };
    MapPage.prototype.clearOverlays = function () {
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].remove();
        }
        this.markers.length = 0;
    };
    MapPage.prototype.confirmAlert = function () {
        var _this = this;
        this.map.setClickable(false);
        var alert = this.alertCtrl.create({
            title: 'Confirmar incidente',
            message: '¿Desea generar este incidente?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        _this.map.setClickable(true);
                        //console.log('No');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        _this.markers[_this.markers.length - 1].getPosition()
                            .then(function (latLng) {
                            _this.crearIncidente(latLng);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    MapPage.prototype.crearIncidente = function (latLng) {
        var _this = this;
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions(headers);
        console.log(latLng);
        var data = {
            id_usuario_informante: this.user.id_usuario,
            id_responsabilidad: this.responsabilidad,
            latitud: latLng.lat,
            longitud: latLng.lng
        };
        //console.log(data);
        this.http.post(this.url.url + 'api/v1/incidentes', JSON.stringify(data))
            .subscribe(function (data) {
            console.log(data);
            if (data.status >= 200) {
                //this.presentToast('Incidente generado exitosamente');
                _this.presentAlert();
                _this.navCtrl.push('DocumentacionPage', {
                    id_incidente: data.json().r
                }).then(function () {
                    _this.map.setClickable(true);
                    _this.clearOverlays();
                    // first we find the index of the current view controller:
                    var index = _this.viewCtrl.index;
                    // then we remove it from the navigation stack
                    _this.navCtrl.remove(index);
                    _this.navCtrl.remove(index - 1);
                });
            }
        });
        //console.log(data);
    };
    MapPage.prototype.presentAlert = function () {
        this.alertCtrl.create({
            title: 'Gestión Municipio',
            subTitle: 'El incidente ha sido creado satisfactoriamente',
            message: 'Ahora puede anexar archivos',
            buttons: [
                {
                    text: 'Aceptar'
                }
            ]
        }).present();
    };
    return MapPage;
}());
MapPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-map',
        templateUrl: 'map.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Geolocation,
        ChangeDetectorRef,
        AlertController,
        Http,
        ViewController,
        ToastController,
        UrlProvider,
        Storage,
        GoogleMaps])
], MapPage);
export { MapPage };
//# sourceMappingURL=map.js.map