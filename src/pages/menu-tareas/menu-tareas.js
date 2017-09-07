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
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the MenuTareasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MenuTareasPage = (function () {
    function MenuTareasPage(navCtrl, navParams, viewCtrl, modalCtrl, http, url, alertCtrl, app) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.url = url;
        this.alertCtrl = alertCtrl;
        this.app = app;
        this.tarea = this.navParams.get('tarea');
    }
    MenuTareasPage.prototype.ionViewDidLoad = function () {
    };
    MenuTareasPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    MenuTareasPage.prototype.verDetalle = function () {
        this.modalCtrl.create('BitacoraDetalleModalPage', {
            detalle: this.tarea.detalle_tarea
        }).present();
    };
    MenuTareasPage.prototype.cerrarTarea = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/CerrarTarea/' + this.tarea.id_tarea)
            .subscribe(function (data) {
            if (data.status == 200) {
                _this.app.getRootNav().setRoot('TareasPage');
                _this.viewCtrl.dismiss();
                _this.presentToast('La tarea se a cerrado correctamente');
            }
        });
    };
    MenuTareasPage.prototype.presentToast = function (title) {
        this.alertCtrl.create({
            title: 'Tarea',
            subTitle: title,
            buttons: ['Aceptar']
        }).present();
    };
    return MenuTareasPage;
}());
MenuTareasPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-menu-tareas',
        templateUrl: 'menu-tareas.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ViewController,
        ModalController,
        Http,
        UrlProvider,
        AlertController,
        App])
], MenuTareasPage);
export { MenuTareasPage };
//# sourceMappingURL=menu-tareas.js.map