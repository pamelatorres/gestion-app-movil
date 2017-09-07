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
 * Generated class for the TareasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var TareasPage = (function () {
    function TareasPage(navCtrl, navParams, http, storage, url, modalCtrl, popoverCtrl) {
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
            _this.obtenerTareas(user.id_usuario);
        });
    }
    TareasPage.prototype.ionViewDidLoad = function () {
    };
    TareasPage.prototype.obtenerTareas = function (idUsuario) {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/Tareas/' + idUsuario + '/0')
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.tareas = data.json();
            }
        });
    };
    TareasPage.prototype.abrirDetalle = function (detalle) {
        this.modalCtrl.create('BitacoraDetalleModalPage', {
            detalle: detalle
        }).present();
    };
    TareasPage.prototype.presentPopover = function (myEvent, tarea) {
        var popover = this.popoverCtrl.create('MenuTareasPage', {
            tarea: tarea
        });
        popover.present({
            ev: myEvent
        });
    };
    return TareasPage;
}());
TareasPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-tareas',
        templateUrl: 'tareas.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        Storage,
        UrlProvider,
        ModalController,
        PopoverController])
], TareasPage);
export { TareasPage };
//# sourceMappingURL=tareas.js.map