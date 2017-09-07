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
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import { Observable } from "rxjs";
import { IonicPage, NavController, NavParams, ToastController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Http, Response } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { UrlProvider } from '../../providers/url/url';
import { MediaCapture } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
var DocumentacionPage = (function () {
    function DocumentacionPage(navCtrl, navParams, toastCtrl, alertCtrl, camera, transfer, file, filePath, platform, loadingCtrl, http, url, mediaCapture, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.filePath = filePath;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.url = url;
        this.mediaCapture = mediaCapture;
        this.storage = storage;
        this.lastImage = null;
        this.incidente = navParams.get('id_incidente');
        this.storage.get('user')
            .then(function (user) { return _this.user = user; });
    }
    DocumentacionPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad DocumentacionPage');
        //this.presentToast('Incidente generado exitosamente');
    };
    DocumentacionPage.prototype.presentToast = function (title) {
        this.alertCtrl.create({
            title: 'Documentación',
            subTitle: title,
            buttons: [
                {
                    text: 'Aceptar'
                }
            ]
        }).present();
    };
    DocumentacionPage.prototype.describirIncidenteAlert = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Describir incidente',
            inputs: [
                {
                    name: 'descripcion',
                    placeholder: 'Descripcion',
                    type: 'text-area'
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    handler: function (data) {
                    }
                },
                {
                    text: 'Ingresar',
                    handler: function (data) {
                        //console.log(data);
                        _this.describir(data);
                    }
                }
            ]
        });
        alert.present();
    };
    DocumentacionPage.prototype.takePicture = function (sourceType) {
        var _this = this;
        var options = {
            quality: 75,
            sourceType: sourceType,
            destinationType: this.camera.DestinationType.FILE_URI,
            saveToPhotoAlbum: false,
            targetWidth: 100,
            targetHeight: 100,
            correctOrientation: true,
        };
        this.camera.getPicture(options).then(function (imagePath) {
            _this.loading = _this.loadingCtrl.create({
                content: 'Subiendo documentación'
            });
            _this.loading.present();
            _this.uploadPhoto(imagePath, 'foto');
        }, function (err) {
            console.log(JSON.stringify(err));
        });
    };
    DocumentacionPage.prototype.uploadPhoto = function (imageFileUri, tipo) {
        var _this = this;
        this.file.resolveLocalFilesystemUrl(imageFileUri)
            .then(function (entry) { return entry.file(function (file) { return _this.readFile(file, tipo); }); })
            .catch(function (err) { return _this.presentToast(err); });
    };
    DocumentacionPage.prototype.readFile = function (file, tipo) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            var formData = new FormData();
            var imgBlob = new Blob([reader.result], { type: file.type });
            console.log(imgBlob);
            formData.append('file', imgBlob, file.name);
            formData.append('id_incidente', _this.incidente);
            formData.append('id_persona_anexo', _this.user.id_usuario);
            formData.append('tipo_anexo', tipo);
            formData.append('descripcion_anexo', '');
            _this.postData(formData);
        };
        reader.readAsArrayBuffer(file);
    };
    DocumentacionPage.prototype.postData = function (formData) {
        var _this = this;
        this.http.post(this.url.url + "api/v1/uploads", formData)
            .catch(function (e) { return _this.handleError(e); })
            .finally(function () { return _this.loading.dismiss(); })
            .subscribe(function (data) {
            if (data.status == 201) {
                _this.presentToast('Datos guardados correctamente');
            }
            ;
            console.log(data);
        });
    };
    DocumentacionPage.prototype.handleError = function (error) {
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
    // Create a new name for the image
    /*	private createFileName() {
          var d = new Date(),
          n = d.getTime(),
          newFileName =  n + ".jpg";
          //console.log(newFileName);
          return newFileName;
        }*/
    DocumentacionPage.prototype.describir = function (data) {
        var _this = this;
        var describir = {
            id_incidente: this.incidente,
            id_persona_anexo: this.user.id_usuario,
            descripcion_anexo: data['descripcion'],
            tipo_anexo: 'texto'
        };
        this.http.post(this.url.url + 'api/v1/documentacion', JSON.stringify(describir))
            .subscribe(function (data) {
            if (data.status == 201) {
                _this.presentToast('Datos guardados correctamente');
            }
            //console.log(data);
        });
    };
    DocumentacionPage.prototype.subirDocumentacion = function () {
        this.navCtrl.push('SubirdocPage', {
            id_incidente: this.incidente
        });
    };
    DocumentacionPage.prototype.verDocumentacion = function () {
        this.navCtrl.push('DocsPage', {
            id_incidente: this.incidente
        });
    };
    DocumentacionPage.prototype.captureVideo = function () {
        var _this = this;
        var options = {
            limit: 1,
            duration: 30,
            quality: 30
        };
        this.mediaCapture.captureVideo(options)
            .then(function (data) {
            _this.loading = _this.loadingCtrl.create({
                content: 'Subiendo documentación'
            });
            _this.loading.present();
            _this.uploadPhoto(data[0]['fullPath'], 'video');
        }, function (err) { return console.error(err); });
    };
    return DocumentacionPage;
}());
DocumentacionPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-documentacion',
        templateUrl: 'documentacion.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        ToastController,
        AlertController,
        Camera,
        Transfer,
        File,
        FilePath,
        Platform,
        LoadingController,
        Http,
        UrlProvider,
        MediaCapture,
        Storage])
], DocumentacionPage);
export { DocumentacionPage };
//# sourceMappingURL=documentacion.js.map