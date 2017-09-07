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
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EvaluacionesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EvaluacionesPage = (function () {
    function EvaluacionesPage(navCtrl, navParams, http, url, popOverMenu, storage, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.popOverMenu = popOverMenu;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.incidentes = new Array;
        this.evaluacionesGuardadas = new Array;
        this.storage.get('evaluaciones')
            .then(function (evaluaciones) {
            _this.evaluacionesGuardadas = new Array;
            _this.evaluacionesGuardadas = evaluaciones;
        });
        this.storage.get('user')
            .then(function (user) {
            _this.userId = user.id_usuario;
            _this.cargarIncidentes();
        });
    }
    EvaluacionesPage.prototype.ionViewDidLoad = function () {
    };
    EvaluacionesPage.prototype.cargarIncidentes = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/evaluaciones/' + this.userId)
            .subscribe(function (data) {
            console.log(data.json());
            if (data.status >= 200 && data.status < 300)
                data.json().forEach(function (incidente) {
                    if (_this.evaluacionesGuardadas != null) {
                        _this.evaluacionesGuardadas.forEach(function (evaluacion) {
                            //console.log(evaluacion);
                            if (+evaluacion.id_incidente == +incidente.id_incidente) {
                                incidente.total = evaluacion.total;
                                incidente.evaluacion = evaluacion;
                            }
                        });
                    }
                    _this.incidentes.push(incidente);
                });
        });
    };
    EvaluacionesPage.prototype.mostrarMenu = function (id) {
        this.popOverMenu.create('MenuEvaluacionesPage', {
            id_incidente: id
        }).present();
    };
    EvaluacionesPage.prototype.evaluarIncidente = function (id_incidente, id_evaluacion) {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/BitacoraIncidente/' + id_incidente)
            .subscribe(function (data) {
            _this.navCtrl.push('BitacoraPage', {
                bitacora: data.json(),
                id_incidente: id_incidente,
                id_evaluacion: id_evaluacion
            });
        });
    };
    EvaluacionesPage.prototype.filalizarEvaluacion = function (evaluacion) {
        var _this = this;
        this.alertCtrl.create({
            title: 'Alerta',
            subTitle: 'Desea finalizar esta evaluación',
            buttons: [
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.postEvaluacion(evaluacion);
                    }
                }, {
                    text: 'Cancelar'
                }
            ]
        }).present();
    };
    EvaluacionesPage.prototype.postEvaluacion = function (evaluacion) {
        var _this = this;
        var data = {
            var_id_evaluacion: evaluacion.id_evaluacion,
            var_puntos_calidad: evaluacion.puntos_calidad,
            var_puntos_solucion: evaluacion.puntos_solucion,
            var_puntos_tiempo: evaluacion.puntos_tiempo
        };
        this.http.post(this.url.url + 'api/v1/Evaluaciones', JSON.stringify(data))
            .subscribe(function (data) {
            if (data.json()) {
                _this.alertCtrl.create({
                    title: 'Evaluación',
                    subTitle: 'Evaluación finalizada con exito'
                }).present();
                _this.navCtrl.setRoot('EvaluacionesPage');
            }
        });
    };
    EvaluacionesPage.prototype.editarEvaluacion = function (id_incidente, id_evaluacion, evaluacion) {
        this.navCtrl.push('EvaluacionPage', {
            id_incidente: id_incidente,
            id_evaluacion: id_evaluacion,
            evaluacion: evaluacion
        });
    };
    return EvaluacionesPage;
}());
EvaluacionesPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-evaluaciones',
        templateUrl: 'evaluaciones.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        PopoverController,
        Storage,
        AlertController])
], EvaluacionesPage);
export { EvaluacionesPage };
//# sourceMappingURL=evaluaciones.js.map