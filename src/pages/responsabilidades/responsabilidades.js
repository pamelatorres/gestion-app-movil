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
import { HomePage } from '../home/home';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the ResponsabilidadesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ResponsabilidadesPage = (function () {
    function ResponsabilidadesPage(navCtrl, navParams, http, url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.clasificacion = navParams.get("clasificacion");
        this.getResponsabilidades();
    }
    ResponsabilidadesPage.prototype.getResponsabilidades = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/responsabilidades/' + this.clasificacion)
            .subscribe(function (data) {
            _this.responsabilidades = data.json();
            //console.log(this.responsabilidades);
        });
    };
    ResponsabilidadesPage.prototype.ionViewDidLoad = function () {
        //console.log(this.clasificacion);
        //console.log('ionViewDidLoad ResponsabilidadesPage');
    };
    ResponsabilidadesPage.prototype.abrirMapa = function (responsabilidad) {
        //console.log(name);
        this.navCtrl.push('MapPage', {
            responsabilidad: responsabilidad
        });
    };
    ResponsabilidadesPage.prototype.backButtonAction = function () {
        /* exits the app, since this is the main/first tab */
        // this.platform.exitApp();
        this.navCtrl.setRoot(HomePage);
    };
    return ResponsabilidadesPage;
}());
ResponsabilidadesPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-responsabilidades',
        templateUrl: 'responsabilidades.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider])
], ResponsabilidadesPage);
export { ResponsabilidadesPage };
//# sourceMappingURL=responsabilidades.js.map