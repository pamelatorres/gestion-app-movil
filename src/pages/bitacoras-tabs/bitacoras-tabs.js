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
import { IonicPage, NavController } from 'ionic-angular';
/**
 * Generated class for the BitacorasTabsPage tabs.
 *
 * See https://angular.io/docs/ts/latest/guide/dependency-injection.html for
 * more info on providers and Angular DI.
 */
var BitacorasTabsPage = (function () {
    function BitacorasTabsPage(navCtrl) {
        this.navCtrl = navCtrl;
        this.bitacorasListRoot = 'BitacorasListPage';
        this.bitacorasMapRoot = 'BitacorasMapPage';
    }
    return BitacorasTabsPage;
}());
BitacorasTabsPage = __decorate([
    Component({
        selector: 'page-bitacoras-tabs',
        templateUrl: 'bitacoras-tabs.html'
    }),
    IonicPage(),
    __metadata("design:paramtypes", [NavController])
], BitacorasTabsPage);
export { BitacorasTabsPage };
//# sourceMappingURL=bitacoras-tabs.js.map