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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the UserModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UserModalPage = (function () {
    function UserModalPage(navCtrl, navParams, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.user = {};
        this.storage.get('user')
            .then(function (user) {
            _this.user = user;
            console.log(_this.user);
        });
    }
    UserModalPage.prototype.ionViewDidLoad = function () {
    };
    UserModalPage.prototype.cerrar = function () {
        this.navCtrl.pop();
    };
    return UserModalPage;
}());
UserModalPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-user-modal',
        templateUrl: 'user-modal.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Storage])
], UserModalPage);
export { UserModalPage };
//# sourceMappingURL=user-modal.js.map