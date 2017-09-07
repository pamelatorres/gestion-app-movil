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
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { Http } from '@angular/http';
import { File } from '@ionic-native/file';
//import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { UrlProvider } from '../../providers/url/url';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs";
/**
 * Generated class for the SubirdocPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SubirdocPage = (function () {
    function SubirdocPage(navCtrl, navParams, fileChooser, http, transfer, file, url, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fileChooser = fileChooser;
        this.http = http;
        this.transfer = transfer;
        this.file = file;
        this.url = url;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.fileSrc = null;
        this.incidente = this.navParams.get('id_incidente');
    }
    SubirdocPage.prototype.ionViewDidLoad = function () {
    };
    SubirdocPage.prototype.abrirFileChooser = function () {
        var _this = this;
        this.fileChooser.open()
            .then(function (uri) {
            _this.fileSrc = uri;
            _this.filename = decodeURIComponent(uri).split("/").pop();
            console.log(_this.fileSrc);
            console.log(_this.filename);
        })
            .catch(function (error) { return console.log(error); });
    };
    SubirdocPage.prototype.subirDoc = function (descripcion) {
        var _this = this;
        if (this.fileSrc != null) {
            this.descripcion = descripcion;
            this.loading = this.loadingCtrl.create({
                content: 'Subiendo documentación'
            });
            this.loading.present();
            console.log(this.fileSrc);
            this.file.resolveLocalFilesystemUrl(this.fileSrc)
                .then(function (entry) { return entry.file(function (file) { return _this.readFile(file); }); })
                .catch(function (erro) {
                console.log(erro);
                _this.loading.dismiss();
                _this.presentToast('error');
            });
        }
    };
    SubirdocPage.prototype.presentToast = function (title) {
        this.alertCtrl.create({
            title: 'Documentación',
            subTitle: title,
            buttons: ['Aceptar']
        }).present();
    };
    SubirdocPage.prototype.readFile = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            var formData = new FormData();
            var imgBlob = new Blob([reader.result], { type: file.type });
            console.log(imgBlob);
            formData.append('file', imgBlob, file.name);
            formData.append('id_incidente', _this.incidente);
            formData.append('id_persona_anexo', '1');
            formData.append('tipo_anexo', 'documento');
            formData.append('descripcion_anexo', _this.descripcion);
            _this.postData(formData);
        };
        reader.readAsArrayBuffer(file);
    };
    SubirdocPage.prototype.postData = function (formData) {
        var _this = this;
        this.http.post(this.url.url + "api/v1/uploads", formData)
            .catch(function (e) { return _this.handleError(e); })
            .finally(function () { return _this.loading.dismiss(); })
            .subscribe(function (data) {
            console.log(data);
        });
    };
    SubirdocPage.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var body = error.json() || '';
            console.log(body);
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    };
    return SubirdocPage;
}());
SubirdocPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-subirdoc',
        templateUrl: 'subirdoc.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        FileChooser,
        Http,
        Transfer,
        File,
        UrlProvider,
        LoadingController,
        AlertController])
], SubirdocPage);
export { SubirdocPage };
//# sourceMappingURL=subirdoc.js.map