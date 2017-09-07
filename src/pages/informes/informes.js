var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the InformesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var InformesPage = (function () {
    function InformesPage(navCtrl, navParams, http, url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.labels = new Array;
        this.data = new Array;
    }
    InformesPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/InformeEficacia')
            .subscribe(function (data) {
            if (data.status >= 200) {
                data.json().forEach(function (fila) {
                    _this.labels.push(fila.nombre_responsabilidad);
                    _this.data.push(fila.eficacia);
                });
                _this.cargarInforme();
            }
        });
    };
    InformesPage.prototype.cargarInforme = function () {
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'polarArea',
            data: {
                labels: this.labels,
                datasets: [{
                        label: '# días promedio',
                        data: this.data,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1
                    }]
            }
        });
    };
    return InformesPage;
}());
__decorate([
    ViewChild('barCanvas'),
    __metadata("design:type", Object)
], InformesPage.prototype, "barCanvas", void 0);
InformesPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-informes',
        templateUrl: 'informes.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider])
], InformesPage);
export { InformesPage };
//# sourceMappingURL=informes.js.map