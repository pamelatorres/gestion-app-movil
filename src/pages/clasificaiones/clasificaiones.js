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
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';
var ClasificaionesPage = (function () {
    function ClasificaionesPage(navCtrl, http, url, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.url = url;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.getClasificaciones();
        this.storage.get('token').then(function (token) {
            console.log('Primer token home ' + token);
        });
    }
    ClasificaionesPage.prototype.getClasificaciones = function () {
        var _this = this;
        var query = this.http.get(this.url.url + 'api/v1/clasificaciones');
        query.subscribe(function (data) {
            _this.clasificaciones = data.json();
        });
        query.catch(this.handleError);
    };
    ClasificaionesPage.prototype.handleError = function (error) {
        console.error('Ha acurrido un error', error);
        return Promise.reject(error.message || error);
    };
    ClasificaionesPage.prototype.abrirResponsabilidades = function (name) {
        //console.log(name);
        this.navCtrl.push('ResponsabilidadesPage', {
            clasificacion: name
        });
    };
    return ClasificaionesPage;
}());
ClasificaionesPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-clasificaiones',
        templateUrl: 'clasificaiones.html',
    }),
    __metadata("design:paramtypes", [NavController,
        Http,
        UrlProvider,
        ToastController,
        Storage])
], ClasificaionesPage);
export { ClasificaionesPage };
//# sourceMappingURL=clasificaiones.js.map