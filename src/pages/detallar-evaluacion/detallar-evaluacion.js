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
import { UrlProvider } from '../../providers/url/url';
import { Http } from '@angular/http';
var DetallarEvaluacionPage = (function () {
    function DetallarEvaluacionPage(navCtrl, navParams, http, url, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.alertCtrl = alertCtrl;
    }
    DetallarEvaluacionPage.prototype.ionViewDidLoad = function () {
    };
    DetallarEvaluacionPage.prototype.guardar = function () {
        var _this = this;
        var data = {
            id_evaluacion: this.navParams.get('id_evaluacion'),
            detalle: this.detalle
        };
        this.http.post(this.url.url + 'api/v1/DetallarEvaluacion', JSON.stringify(data))
            .subscribe(function (data) {
            console.log(data.json());
            _this.alertCtrl.create({
                title: 'Evaluación',
                subTitle: 'Detalle gurdado con exito',
                buttons: [
                    {
                        text: 'Aceptar'
                    }
                ]
            }).present();
            _this.navCtrl.setRoot('EvaluacionesPage');
        });
    };
    return DetallarEvaluacionPage;
}());
DetallarEvaluacionPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-detallar-evaluacion',
        templateUrl: 'detallar-evaluacion.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        AlertController])
], DetallarEvaluacionPage);
export { DetallarEvaluacionPage };
//# sourceMappingURL=detallar-evaluacion.js.map