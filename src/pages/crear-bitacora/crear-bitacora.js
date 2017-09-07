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
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the CrearBitacoraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CrearBitacoraPage = (function () {
    function CrearBitacoraPage(navCtrl, navParams, alertCtrl, toastCtrl, http, url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.url = url;
        var bitacora = this.navParams.get('bitacora');
        if (bitacora.observacion == null && bitacora.titulo)
            this.puedeCerrarBitacora = false;
        else
            this.puedeCerrarBitacora = true;
        this.tareas = this.navParams.get('tareas').length;
    }
    CrearBitacoraPage.prototype.ionViewDidLoad = function () {
    };
    CrearBitacoraPage.prototype.irA = function (ruta) {
        this.navCtrl.push(ruta, {
            id_bitacora: this.navParams.get('id_bitacora'),
            bitacora: this.navParams.get('bitacora')
        });
    };
    CrearBitacoraPage.prototype.confirmarCerrarBitacora = function () {
        var _this = this;
        this.alertCtrl.create({
            title: 'Alerta',
            subTitle: '¿Desea cerrar la bitácora?',
            message: 'Será devuelta a quién se la derivó',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.cerrarBitacora();
                    }
                }, {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        }).present();
    };
    // buscar una forma mejor de hacerlo
    CrearBitacoraPage.prototype.cerrarBitacora = function () {
        var _this = this;
        var data = {
            id_bitacora: this.navParams.get('id_bitacora'),
            id_bitacora_derivacion: this.navParams.get('bitacora').id_bitacora_derivacion
        };
        this.http.post(this.url.url + 'api/v1/CerrarBitacora', JSON.stringify(data))
            .subscribe(function (data) {
            console.log(data);
            if (data.status == 201 && data.json().r == '1') {
                _this.navCtrl.setRoot('HomePage');
                _this.presentToast('La bitacora se cerrado correctamente');
            }
            else {
                _this.presentToast('Aun hay tareas pendientes');
            }
        });
    };
    CrearBitacoraPage.prototype.presentToast = function (title) {
        this.alertCtrl.create({
            title: 'Bitacora',
            subTitle: title,
            buttons: [
                {
                    text: 'Aceptar'
                }
            ]
        }).present();
    };
    return CrearBitacoraPage;
}());
CrearBitacoraPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-crear-bitacora',
        templateUrl: 'crear-bitacora.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        AlertController,
        ToastController,
        Http,
        UrlProvider])
], CrearBitacoraPage);
export { CrearBitacoraPage };
//# sourceMappingURL=crear-bitacora.js.map