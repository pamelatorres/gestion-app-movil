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
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the DetallarBitacoraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DetallarBitacoraPage = (function () {
    function DetallarBitacoraPage(navCtrl, navParams, http, url, aterCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.aterCtrl = aterCtrl;
        this.titulo = '';
        this.observacion = '';
        this.bitacora = this.navParams.get('id_bitacora');
        this.callback = this.navParams.get('callback');
        console.log(this.callback);
    }
    DetallarBitacoraPage.prototype.ionViewDidLoad = function () {
    };
    DetallarBitacoraPage.prototype.guardar = function () {
        var _this = this;
        this.data = {
            observacion: this.observacion,
            id_bitacora: this.bitacora,
            titulo: this.titulo
        };
        this.http.post(this.url.url + 'api/v1/BitacoraDetalle', JSON.stringify(this.data))
            .subscribe(function (data) {
            if (data.status == 201) {
                _this.aterCtrl.create({
                    title: 'Detallar bitacora',
                    subTitle: 'Detalle guardado con exito',
                    buttons: ['Aceptar']
                }).present();
                _this.callback(_this.data);
                _this.navCtrl.pop();
            }
        });
    };
    return DetallarBitacoraPage;
}());
DetallarBitacoraPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-detallar-bitacora',
        templateUrl: 'detallar-bitacora.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        AlertController])
], DetallarBitacoraPage);
export { DetallarBitacoraPage };
//# sourceMappingURL=detallar-bitacora.js.map