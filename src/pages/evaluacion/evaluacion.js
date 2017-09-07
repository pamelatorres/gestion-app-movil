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
import { Storage } from '@ionic/storage';
/**
 * Generated class for the EvaluacionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EvaluacionPage = (function () {
    function EvaluacionPage(navCtrl, navParams, http, url, alertCtrl, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.alertCtrl = alertCtrl;
        this.storage = storage;
        this.cargarProgreso = 0;
        this.index = 0;
        this.puedeMostrarEstrellas = false;
        this.puedeMostrarAccion = false;
        this.puedeMostarPorcentaje = false;
        this.puedeMostrarControles = true;
        this.puedeMostrarResultadoFinal = false;
        this.puedeMostrarBotonGuardar = false;
        this.cargarPreguntas();
        this.storage.get('user')
            .then(function (user) {
            _this.userId = user.id_usuario;
        });
    }
    EvaluacionPage.prototype.ionViewDidLoad = function () {
        var evaluacion = this.navParams.get('evaluacion');
        if (evaluacion) {
            this.estrellas = evaluacion.estrellas,
                this.accion = evaluacion.solucion,
                this.porcentaje = evaluacion.calidad;
        }
    };
    EvaluacionPage.prototype.atras = function () {
        if ((this.cargarProgreso - Math.round(100 / this.numerosDePreguntas)) >= 0) {
            this.cargarProgreso -= Math.round(100 / this.numerosDePreguntas);
            this.index--;
            this.puedeMostrarControles = true;
            this.puedeMostrarResultadoFinal = false;
            this.puedeMostrarBotonGuardar = false;
            this.mostrarPreguntas(this.index);
        }
    };
    EvaluacionPage.prototype.siguiente = function () {
        if ((this.cargarProgreso + Math.round(100 / this.numerosDePreguntas)) <= 100) {
            this.cargarProgreso += Math.round(100 / this.numerosDePreguntas);
            this.index++;
            this.mostrarPreguntas(this.index);
        }
    };
    EvaluacionPage.prototype.cargarPreguntas = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/PreguntasEvaluacion')
            .subscribe(function (data) {
            if (data.status >= 200) {
                console.log(data);
                _this.preguntas = data.json();
                _this.numerosDePreguntas = _this.preguntas.length;
                _this.mostrarPreguntas(_this.index);
            }
        });
    };
    EvaluacionPage.prototype.mostrarPreguntas = function (index) {
        if (index < this.numerosDePreguntas) {
            switch (this.preguntas[index].simbolo_tipo) {
                case "estrella":
                    this.puedeMostrarEstrellas = true;
                    this.puedeMostrarAccion = false;
                    this.puedeMostarPorcentaje = false;
                    break;
                case "accion":
                    this.puedeMostrarAccion = true;
                    this.puedeMostrarEstrellas = false;
                    this.puedeMostarPorcentaje = false;
                    break;
                case "porcentaje":
                    this.puedeMostarPorcentaje = true;
                    this.puedeMostrarEstrellas = false;
                    this.puedeMostrarAccion = false;
                    break;
                default:
                    // code...
                    break;
            }
            this.titulo = this.preguntas[index].nombre_parametro;
            this.detalle = this.preguntas[index].detalle_parametro;
        }
        else {
            // cambiar porcentajes de valores a dinamicos que estan en la base de datos
            this.puntosSolucion = this.accion.localeCompare('true') ? 0 : 10;
            this.puntosTiempo = (this.porcentaje * 50) / 100;
            this.puntosCalidad = ((this.estrellas * 100) / 5 * 40) / 100;
            this.total = this.puntosSolucion + this.puntosTiempo + this.puntosCalidad;
            this.puedeMostrarControles = false;
            this.puedeMostrarResultadoFinal = true;
            this.puedeMostrarBotonGuardar = true;
        }
    };
    EvaluacionPage.prototype.guardarEvaluacion = function () {
        var _this = this;
        var data = {
            id_incidente: this.navParams.get('id_incidente'),
            id_evaluacion: this.navParams.get('id_evaluacion'),
            id_persona_evaluadora: this.userId,
            puntos_solucion: this.puntosSolucion,
            puntos_tiempo: this.puntosTiempo,
            puntos_calidad: this.puntosCalidad,
            estrellas: this.estrellas,
            solucion: this.accion,
            calidad: this.porcentaje,
            total: this.total
        };
        this.storage.get('evaluaciones')
            .then(function (evaluaciones) {
            if (evaluaciones == null) {
                evaluaciones = new Array;
            }
            evaluaciones.push(data);
            _this.storage.set('evaluaciones', evaluaciones)
                .then(function () {
                _this.alertCtrl.create({
                    title: 'Evaluación',
                    subTitle: 'Evaluación guardada correctamente',
                    buttons: [
                        {
                            text: 'Aceptar'
                        }
                    ]
                }).present();
                _this.navCtrl.push('DetallarEvaluacionPage', {
                    id_evaluacion: _this.navParams.get('id_evaluacion')
                });
            });
        });
    };
    return EvaluacionPage;
}());
EvaluacionPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-evaluacion',
        templateUrl: 'evaluacion.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        AlertController,
        Storage])
], EvaluacionPage);
export { EvaluacionPage };
//# sourceMappingURL=evaluacion.js.map