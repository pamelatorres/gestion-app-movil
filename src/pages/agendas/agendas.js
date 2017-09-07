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
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the AgendasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AgendasPage = (function () {
    function AgendasPage(navCtrl, navParams, url, http, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.url = url;
        this.http = http;
        this.modalCtrl = modalCtrl;
        this.calendar = {
            mode: 'month',
            currentDate: new Date()
        };
        this.markDisabled = function (date) {
            var current = new Date();
            current.setHours(0, 0, 0);
            return date < current;
        };
    }
    AgendasPage.prototype.ionViewDidLoad = function () {
        this.loadEvents();
    };
    AgendasPage.prototype.loadEvents = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/Agendas')
            .subscribe(function (data) {
            if (data.status == 200) {
                var events = [];
                data.json().forEach(function (agenda, index) {
                    var fechaInicio = new Date(agenda.fecha_inicio);
                    var fechaTermino = new Date(agenda.fecha_termino);
                    events.push({
                        position: index,
                        title: agenda.titulo,
                        descripcion: agenda.descripcion_agenda,
                        startTime: fechaInicio,
                        endTime: fechaTermino,
                        allDay: false
                    });
                });
                _this.eventSource = events;
            }
        });
    };
    AgendasPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    AgendasPage.prototype.onEventSelected = function (event) {
        this.abrirDetalle(this.eventSource[event.position].descripcion);
        //console.log(event);
    };
    AgendasPage.prototype.changeMode = function (mode) {
        this.calendar.mode = mode;
    };
    AgendasPage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    AgendasPage.prototype.onTimeSelected = function (ev) {
        //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        //(ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    };
    AgendasPage.prototype.onCurrentDateChanged = function (event) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    };
    AgendasPage.prototype.onRangeChanged = function (ev) {
        //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    };
    AgendasPage.prototype.abrirDetalle = function (descripcion) {
        //console.log(descripcion);
        var detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage', {
            detalle: descripcion
        });
        detalleModal.present();
    };
    return AgendasPage;
}());
AgendasPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-agendas',
        templateUrl: 'agendas.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        UrlProvider,
        Http,
        ModalController])
], AgendasPage);
export { AgendasPage };
//# sourceMappingURL=agendas.js.map