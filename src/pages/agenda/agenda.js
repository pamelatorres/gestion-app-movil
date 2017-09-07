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
 * Generated class for the AgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AgendaPage = (function () {
    function AgendaPage(navCtrl, navParams, http, url, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
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
        this.bitacora = this.navParams.get('id_bitacora');
    }
    AgendaPage.prototype.ionViewDidLoad = function () {
        this.loadEvents();
    };
    AgendaPage.prototype.loadEvents = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/Agenda/' + this.bitacora)
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
    AgendaPage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    AgendaPage.prototype.onEventSelected = function (event) {
        this.abrirDetalle(this.eventSource[event.position].descripcion);
        //console.log(event);
    };
    AgendaPage.prototype.changeMode = function (mode) {
        this.calendar.mode = mode;
    };
    AgendaPage.prototype.today = function () {
        this.calendar.currentDate = new Date();
    };
    AgendaPage.prototype.onTimeSelected = function (ev) {
        //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
        //(ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    };
    AgendaPage.prototype.onCurrentDateChanged = function (event) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    };
    AgendaPage.prototype.onRangeChanged = function (ev) {
        //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    };
    AgendaPage.prototype.abrirDetalle = function (descripcion) {
        //console.log(descripcion);
        var detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage', {
            detalle: descripcion
        });
        detalleModal.present();
    };
    return AgendaPage;
}());
AgendaPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-agenda',
        templateUrl: 'agenda.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider,
        ModalController])
], AgendaPage);
export { AgendaPage };
//# sourceMappingURL=agenda.js.map