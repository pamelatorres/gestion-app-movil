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
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
import { PersonasDataProvider } from '../../providers/personas-data/personas-data';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
/**
 * Generated class for the VbPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var VbPage = (function () {
    function VbPage(navCtrl, navParams, http, url, toastCtrl, storage, alertCtrl, personasData) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.personasData = personasData;
        this.palabraClave = '';
        this.puedeMostratLista = false;
        this.buscando = false;
        this.busquedaControl = new FormControl();
        this.bitacora = this.navParams.get('bitacora');
        if (this.bitacora.id_bitacora_derivacion == 0) {
            this.puedeMostratLista = true;
            this.setFilteredItems();
            this.busquedaControl.valueChanges.debounceTime(700).subscribe(function (busqueda) {
                _this.buscando = false;
                _this.setFilteredItems();
            });
        }
        this.storage.get('user')
            .then(function (user) {
            _this.user = user;
        });
    }
    VbPage.prototype.ionViewDidLoad = function () {
    };
    VbPage.prototype.guardar = function () {
        var _this = this;
        var responsable;
        if (this.items != null) {
            responsable = this.items[this.itemSeleccionado].id_usuario;
        }
        else {
            responsable = 0;
        }
        var data = {
            accion: 1,
            id_vb: 0,
            id_bitacora: this.bitacora.id_bitacora,
            detalle_vb: this.detalle,
            monto_vb: this.monto,
            solicitante: this.user.id_usuario,
            responsable: responsable
        };
        this.http.post(this.url.url + 'api/v1/VistoBueno', JSON.stringify(data))
            .subscribe(function (data) {
            if (data.status == 201) {
                console.log(data);
                _this.navCtrl.pop();
                _this.presentToast('Se ha creado la petición de visto bueno');
            }
        });
    };
    VbPage.prototype.presentToast = function (title) {
        this.alertCtrl.create({
            title: 'Visto bueno',
            subTitle: 'Se ha creado un visto bueno',
            message: 'Debe esperar a que se autorize',
            buttons: [
                {
                    text: 'Aceptar'
                }
            ]
        }).present();
    };
    VbPage.prototype.onSearchInput = function () {
        this.buscando = true;
    };
    VbPage.prototype.setFilteredItems = function () {
        this.items = this.personasData.filtrarDatos(this.palabraClave);
    };
    VbPage.prototype.seleccionarUsuario = function (idUsuario, i) {
        this.itemSeleccionado = i;
    };
    VbPage.prototype.seleccionado = function (index) {
        return index === this.itemSeleccionado;
    };
    return VbPage;
}());
VbPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-vb',
        templateUrl: 'vb.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        ToastController,
        Storage,
        AlertController,
        PersonasDataProvider])
], VbPage);
export { VbPage };
//# sourceMappingURL=vb.js.map