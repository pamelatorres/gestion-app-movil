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
//import { DocumentacionPage } from '../documentacion/documentacion';
import { Storage } from '@ionic/storage';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the IncidentesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var IncidentesPage = (function () {
    function IncidentesPage(navCtrl, navParams, http, url, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.storage = storage;
        this.storage.get('user')
            .then(function (user) {
            _this.user = user;
            _this.getIncidentes();
        });
    }
    IncidentesPage.prototype.ionViewDidLoad = function () {
    };
    IncidentesPage.prototype.getIncidentes = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/UsuariosIncidentes/' + this.user.id_usuario)
            .subscribe(function (data) {
            _this.incidentes = data.json();
        });
    };
    IncidentesPage.prototype.abrirDocumentacion = function ($id) {
        this.navCtrl.push('BitacoraPage', {
            id_incidente: $id
        });
    };
    return IncidentesPage;
}());
IncidentesPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-incidentes',
        templateUrl: 'incidentes.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        Storage])
], IncidentesPage);
export { IncidentesPage };
//# sourceMappingURL=incidentes.js.map