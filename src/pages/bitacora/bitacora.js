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
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, PopoverController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the BitacoraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BitacoraPage = (function () {
    function BitacoraPage(navCtrl, navParams, http, url, modalCtrl, alertCtrl, toastCtrl, popOverCtrl, storage, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.popOverCtrl = popOverCtrl;
        this.storage = storage;
        this.platform = platform;
        this.textos = Array();
        this.fotos = Array();
        this.videos = Array();
        this.documentos = Array();
        this.incidente = 50;
        this.shownGroup = null;
        this.tareas = new Array;
        this.tareasPendientes = 0;
        this.vbsPendientes = 0;
        this.vbs = new Array;
        this.now = new Date().toJSON();
        this.getData = function (data) {
            return new Promise(function (resolve, reject) {
                console.log(data);
                _this.bitacora.titulo = data.titulo;
                _this.bitacora.observacion = data.observacion;
            });
        };
        this.bitacora = this.navParams.get('bitacora');
        this.getDocs();
        this.getTareas();
        this.getVistosBuenos();
        this.evaluacion = this.navParams.get('id_evaluacion');
        this.calculoDias(this.bitacora.id_incidente);
    }
    BitacoraPage.prototype.ionViewDidLoad = function () {
    };
    BitacoraPage.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    BitacoraPage.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    BitacoraPage.prototype.getDocs = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/documentacion/' + this.bitacora.id_incidente)
            .subscribe(function (data) {
            var datajson = data.json();
            for (var i = datajson.length - 1; i >= 0; i--) {
                var doc = datajson[i];
                switch (doc.tipo_anexo) {
                    case "foto":
                        _this.fotos.push(doc);
                        break;
                    case "video":
                        _this.videos.push(doc);
                        break;
                    case "documento":
                        _this.documentos.push(doc);
                        break;
                    case "texto":
                        _this.textos.push(doc);
                    default:
                        // code...
                        break;
                }
            }
            ;
        });
    };
    BitacoraPage.prototype.irADetallarBitacora = function () {
        this.navCtrl.push('DetallarBitacoraPage', {
            id_bitacora: this.bitacora.id_bitacora,
            bitacora: this.bitacora,
            callback: this.getData
        });
    };
    BitacoraPage.prototype.irA = function (page) {
        this.navCtrl.push(page, {
            id_bitacora: this.bitacora.id_bitacora,
            bitacora: this.bitacora
        });
    };
    BitacoraPage.prototype.irACrearBitacora = function () {
        this.navCtrl.push('CrearBitacoraPage', {
            id_bitacora: this.bitacora.id_bitacora,
            bitacora: this.bitacora,
            tareas: this.tareas
        });
    };
    BitacoraPage.prototype.abrirDetalle = function () {
        var detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage', {
            detalle: this.bitacora.observacion,
            titulo: this.bitacora.titulo
        });
        detalleModal.present();
    };
    BitacoraPage.prototype.getTareas = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/Tareas/' + this.bitacora.id_bitacora + '/1')
            .subscribe(function (data) {
            console.log(data);
            if (data.status >= 200) {
                _this.tareas = data.json();
                _this.tareas.forEach(function (tarea) {
                    if (tarea.estado_tarea == 1)
                        _this.tareasPendientes++;
                });
            }
        });
    };
    BitacoraPage.prototype.getVistosBuenos = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/VistoBueno/' + this.bitacora.id_bitacora + '/0')
            .subscribe(function (data) {
            if (data.status >= 200) {
                _this.vbs = data.json();
                _this.vbs.forEach(function (vb) {
                    if (vb.aprueba_vb == null)
                        _this.vbsPendientes++;
                });
            }
        });
    };
    BitacoraPage.prototype.abrirMenuVB = function (ev, vb) {
        var _this = this;
        if (this.platform.is('cordava') && vb.aprueba_vb == null) {
            this.storage.get('user')
                .then(function (user) {
                if (user.id_usuario != vb.id_usuario_vb) {
                    _this.popOverCtrl.create('VbMenuPage', {
                        vb: vb
                    }).present({ ev: ev });
                }
            });
        }
        else {
            this.popOverCtrl.create('VbMenuPage', {
                vb: vb
            }).present({ ev: ev });
        }
    };
    BitacoraPage.prototype.irAEvaluacion = function () {
        this.navCtrl.push('EvaluacionPage', {
            id_incidente: this.navParams.get('id_incidente'),
            id_evaluacion: this.navParams.get('id_evaluacion')
        });
    };
    BitacoraPage.prototype.calculoDias = function (idIncidente) {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/CalculoDias/' + idIncidente)
            .subscribe(function (data) {
            _this.calculoDiasData = data.json();
            responsable;
            _this.diasTotales = _this.calculoDiasData[0].dias_totales;
        });
    };
    BitacoraPage.prototype.abrirToast = function () {
        this.toastCtrl.create({ message: 'Número de días totales' }).present();
    };
    return BitacoraPage;
}());
BitacoraPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-bitacora',
        templateUrl: 'bitacora.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        ModalController,
        AlertController,
        ToastController,
        PopoverController,
        Storage,
        Platform])
], BitacoraPage);
export { BitacoraPage };
//# sourceMappingURL=bitacora.js.map