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
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Http, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import * as moment from 'moment';
/**
 * Generated class for the CerrarVbPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CerrarVbPage = (function () {
    function CerrarVbPage(navCtrl, navParams, http, url, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.alertCtrl = alertCtrl;
        this.aceptar = true;
        this.fecha = new Date();
        if (this.navParams.get('data').vb != null)
            this.data = JSON.parse(this.navParams.get('data').vb);
        else
            this.data = this.navParams.get('data');
        console.log(this.navParams.get('data'));
        console.log(this.data);
    }
    CerrarVbPage.prototype.ionViewDidLoad = function () {
    };
    CerrarVbPage.prototype.cerrarVb = function (aceptar) {
        var _this = this;
        var data = {
            id_vb: this.data.vbid,
            aprueba_vb: this.aceptar ? 1 : 0,
            respuesta_vb: this.respuesta,
            fecha_vb: moment().format('YYYY-MM-DD')
        };
        var headers = new Headers({
            'Content-Type': 'application/json; charset=UTF-8'
        });
        var options = new RequestOptions({ method: RequestMethod.Put, headers: headers });
        this.http.put(this.url.url + 'api/v1/VistoBueno', JSON.stringify(data), options)
            .subscribe(function (data) {
            if (data.json()) {
                _this.navCtrl.setRoot('VbsPage');
                _this.presentAlert();
            }
        });
    };
    CerrarVbPage.prototype.presentAlert = function () {
        var info = this.aceptar ? ' aceptado ' : ' rechazado ';
        var subtitle = 'Visto bueno' + info + 'corretamente';
        this.alertCtrl.create({
            title: 'Gestión Municipio',
            subTitle: subtitle,
            buttons: [
                {
                    text: 'Aceptar'
                }
            ]
        }).present();
    };
    CerrarVbPage.prototype.onChange = function () {
        this.aceptar = this.aceptarString == 'si' ? true : false;
        console.log(this.aceptar);
    };
    return CerrarVbPage;
}());
CerrarVbPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-cerrar-vb',
        templateUrl: 'cerrar-vb.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        AlertController])
], CerrarVbPage);
export { CerrarVbPage };
//# sourceMappingURL=cerrar-vb.js.map