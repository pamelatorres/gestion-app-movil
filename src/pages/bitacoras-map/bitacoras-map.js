var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
var BitacorasMapPage = (function () {
    function BitacorasMapPage(navCtrl, navParams, http, url, storage, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.storage = storage;
        this.geolocation = geolocation;
    }
    BitacorasMapPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    BitacorasMapPage.prototype.loadMap = function () {
        var _this = this;
        var element = document.getElementById('map');
        this.geolocation.getCurrentPosition()
            .then(function (position) {
            var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                center: latlng,
                zoom: 18
            };
            _this.map = new google.maps.Map(element, mapOptions);
            _this.storage.get('user')
                .then(function (user) {
                _this.getIncidentes(user);
            });
        });
    };
    BitacorasMapPage.prototype.getIncidentes = function (user) {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/Bitacoras/' + user.id_usuario + '/1')
            .subscribe(function (data) {
            data.json().forEach(function (bitacora, i) {
                var latlng = new google.maps.LatLng(+bitacora.latitud, +bitacora.longitud);
                var markerString = bitacora.nombre_responsabilidad + '<br>' + bitacora.fecha_creacion;
                var infoWidow = new google.maps.InfoWindow({
                    content: markerString
                });
                var marker = new google.maps.Marker({
                    map: _this.map,
                    animation: google.maps.Animation.Drop,
                    position: latlng,
                    title: 'fsdlnfkls'
                });
                marker.addListener('click', function () {
                    infoWidow.open(this.map, marker);
                });
                if (i == data.json().length - 1) {
                    _this.map.panTo(latlng);
                }
            });
        });
    };
    return BitacorasMapPage;
}());
BitacorasMapPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-bitacoras-map',
        templateUrl: 'bitacoras-map.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        Storage,
        Geolocation])
], BitacorasMapPage);
export { BitacorasMapPage };
//# sourceMappingURL=bitacoras-map.js.map