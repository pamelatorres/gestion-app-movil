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
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the VbsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var VbsPage = (function () {
    function VbsPage(navCtrl, navParams, http, storage, url, modalCtrl, popoverCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.url = url;
        this.modalCtrl = modalCtrl;
        this.popoverCtrl = popoverCtrl;
        this.storage.get('user')
            .then(function (user) {
            _this.obtenerVistosBuenos(user.id_usuario);
        });
    }
    VbsPage.prototype.ionViewDidLoad = function () {
    };
    VbsPage.prototype.obtenerVistosBuenos = function (idUsuario) {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/VistoBueno/' + idUsuario + '/1')
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.vbs = data.json();
                _this.vbs.forEach(function (vb) {
                    if (vb.aprueba_vb == null) {
                        vb.textoAprueba = 'En espera';
                    }
                    else if (+vb.aprueba_vb == 0) {
                        vb.textoAprueba = 'Rechazado';
                    }
                    else {
                        vb.textoAprueba = 'Aprobado';
                    }
                });
                console.log(_this.vbs);
            }
        });
    };
    VbsPage.prototype.cerrarVb = function (vb) {
        if (vb.aprueba_vb == null) {
            var data = {
                detalle_vb: vb.detalle_vb,
                monto_vb: vb.monto_vb,
                vbid: vb.id_vb
            };
            this.navCtrl.push('CerrarVbPage', {
                data: data
            });
        }
    };
    return VbsPage;
}());
VbsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-vbs',
        templateUrl: 'vbs.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        Storage,
        UrlProvider,
        ModalController,
        PopoverController])
], VbsPage);
export { VbsPage };
//# sourceMappingURL=vbs.js.map