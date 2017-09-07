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
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the DocsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var DocsPage = (function () {
    function DocsPage(navCtrl, navParams, http, url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.url = url;
        this.fotos = Array();
        this.videos = Array();
        this.documentos = Array();
        this.shownGroup = null;
        this.incidente = this.navParams.get('id_incidente');
        this.getDocs();
    }
    DocsPage.prototype.getDocs = function () {
        var _this = this;
        this.http.get(this.url.url + 'api/v1/documentacion/' + this.incidente)
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
                    default:
                        // code...
                        break;
                }
            }
            ;
        });
    };
    DocsPage.prototype.ionViewDidLoad = function () {
    };
    DocsPage.prototype.toggleGroup = function (group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        }
        else {
            this.shownGroup = group;
        }
    };
    ;
    DocsPage.prototype.isGroupShown = function (group) {
        return this.shownGroup === group;
    };
    ;
    return DocsPage;
}());
DocsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-docs',
        templateUrl: 'docs.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        Http,
        UrlProvider])
], DocsPage);
export { DocsPage };
//# sourceMappingURL=docs.js.map