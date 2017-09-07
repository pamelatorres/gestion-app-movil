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
import { PersonasDataProvider } from '../../providers/personas-data/personas-data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the DerivarresPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DerivarresPage = (function () {
    function DerivarresPage(navCtrl, navParams, personasData, http, url, alertCtrl, toastCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.personasData = personasData;
        this.http = http;
        this.url = url;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.palabraClave = '';
        this.buscando = false;
        this.derivarA = null;
        this.bitacora = this.navParams.get('bitacora');
        //this.obtenerClasificaciones();
        this.busquedaControl = new FormControl();
        console.log(this.bitacora);
    }
    DerivarresPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setFilteredItems();
        this.busquedaControl.valueChanges.debounceTime(700).subscribe(function (busqueda) {
            _this.buscando = false;
            _this.setFilteredItems();
        });
    };
    DerivarresPage.prototype.obtenerClasificaciones = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/clasificaciones')
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.clasificaciones = data.json();
            }
        });
    };
    DerivarresPage.prototype.onChange = function () {
        console.log(this.departamento);
    };
    DerivarresPage.prototype.obtenerUsuario = function () {
        this.http.get(this.url.url + 'api/v1/responsables')
            .subscribe(function (data) {
            if (data.status == 200) {
            }
        });
    };
    DerivarresPage.prototype.onSearchInput = function () {
        this.buscando = true;
    };
    DerivarresPage.prototype.setFilteredItems = function () {
        this.items = this.personasData.filtrarDatos(this.palabraClave);
    };
    DerivarresPage.prototype.seleccionarUsuario = function (idUsuario, i) {
        this.itemSeleccionado = i;
    };
    DerivarresPage.prototype.seleccionado = function (index) {
        return index === this.itemSeleccionado;
    };
    DerivarresPage.prototype.crearAlert = function () {
        var _this = this;
        this.alertCtrl.create({
            title: 'Alerta',
            subTitle: '¿Desea derivar esta bitacora?',
            message: 'Al derivar ya no podrá seguir modificando la bitacora',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.derivar();
                    }
                },
                {
                    text: 'Cancelar',
                    role: 'cancel'
                }
            ]
        }).present();
    };
    DerivarresPage.prototype.derivar = function () {
        var _this = this;
        this.storage.get('user')
            .then(function (user) {
            var data = {
                id_usuario: user.id_usuario,
                id_bitacora: _this.navParams.get('id_bitacora'),
                id_usuario_responsable: _this.items[_this.itemSeleccionado].id_usuario,
                id_incidente: _this.bitacora.id_incidente
            };
            _this.http.post(_this.url.url + 'api/v1/Derivar', JSON.stringify(data))
                .subscribe(function (data) {
                console.log(data);
                if (data.status == 200 && data.json().r == 1) {
                    _this.navCtrl.setRoot('HomePage');
                    _this.presentAlert();
                }
                else {
                    _this.presentToast('Hay tareas pendientes, finalize las para poder derivar la bitacora');
                }
            });
        });
    };
    DerivarresPage.prototype.presentToast = function (title) {
        var toast = this.toastCtrl.create({
            message: title,
            duration: 4000,
            position: 'middle'
        });
        toast.onDidDismiss(function () {
            //console.log('Dismissed toast');
        });
        toast.present();
    };
    DerivarresPage.prototype.presentAlert = function () {
        this.alertCtrl.create({
            title: 'Gestión Municipio',
            subTitle: 'La bitacora ha sido derivada satisfactoriamente',
            buttons: [
                {
                    text: 'Aceptar'
                }
            ]
        }).present();
    };
    return DerivarresPage;
}());
DerivarresPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-derivarres',
        templateUrl: 'derivarres.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        PersonasDataProvider,
        Http,
        UrlProvider,
        AlertController,
        ToastController,
        Storage])
], DerivarresPage);
export { DerivarresPage };
//# sourceMappingURL=derivarres.js.map