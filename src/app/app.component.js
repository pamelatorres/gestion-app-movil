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
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Http } from '@angular/http';
import { UrlProvider } from '../providers/url/url';
//import { ListPage } from '../pages/list/list';
//import { ResponsabilidadesPage } from '../pages/responsabilidades/responsabilidades';
//import { MapPage } from '../pages/map/map';
var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, storage, firebase, auth, localNotifications, http, url) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        this.firebase = firebase;
        this.auth = auth;
        this.localNotifications = localNotifications;
        this.http = http;
        this.url = url;
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Inicio', component: 'HomePage' },
            { title: 'Mis Bitacoras', component: 'BitacorasTabsPage' },
            { title: 'Vistos buenos', component: 'VbsPage' },
            { title: 'Mis Tareas', component: 'TareasPage' },
            { title: 'Agenda', component: 'AgendasPage' },
            { title: 'Informes', component: 'InformesPage' },
            { title: 'Evaluaciones', component: 'EvaluacionesPage' },
            { title: 'Perfil', component: '' },
            { title: 'Acerca de', component: '' }
        ];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('cordova')) {
                _this.buscarUsuario();
                _this.firebase.onNotification()
                    .subscribe(function (data) {
                    console.log(data);
                    if (!data.wasTapped) {
                        var titulo = void 0;
                        var texto = void 0;
                        var datos = void 0;
                        switch (data.tipo) {
                            case "incidente":
                                var usuario = JSON.parse(data.usuario);
                                titulo = 'Se ha aceptado un incidente';
                                texto = usuario.nombre_nivel;
                                datos = { tipo: 'incidente', id_bitacora: usuario.id_bitacora };
                                break;
                            case "tarea":
                                titulo = 'Se te ha asignado una tarea';
                                texto = '';
                                datos = { tipo: 'tarea' };
                                break;
                            case "derivacion":
                                titulo = 'Se te ha derivado una bitacora';
                                texto = '';
                                datos = { tipo: 'derivacion' };
                                break;
                            case "pedido_visto_bueno":
                                titulo = 'Se te ha solicitado un visto bueno';
                                texto = '';
                                datos = { tipo: 'pedido_visto_bueno', vb: data.vb, vbid: data.vbid };
                                break;
                            case "bitacora_cerrada":
                                titulo = 'Se ha cerrado una bitácora que has derivado';
                                texto = 'Ahora puedes volver a editarla';
                                datos = { tipo: 'bitacora_cerrada' };
                                break;
                            default:
                                break;
                        }
                        _this.localNotifications.schedule({
                            title: titulo,
                            text: texto,
                            data: datos
                        });
                    }
                });
                _this.localNotifications.on('click', function (notification) {
                    var data = JSON.parse(notification.data);
                    console.log(data);
                    switch (data.tipo) {
                        case "incidente":
                            _this.http.get(_this.url.url + 'api/v1/Bitacora/' + data.id_bitacora)
                                .subscribe(function (bitacora) {
                                console.log(bitacora);
                                _this.nav.push('BitacoraPage', {
                                    bitacora: bitacora.json()
                                });
                            });
                            break;
                        case "tarea":
                            _this.nav.push('TareasPage');
                            break;
                        case "derivacion":
                            _this.nav.push('BitacorasPage');
                            break;
                        case "pedido_visto_bueno":
                            _this.nav.push('VbsPage', {
                                data: data
                            });
                            break;
                        case "":
                            _this.nav.push('BitacorasPage');
                            break;
                        default:
                            break;
                    }
                });
            }
            else {
                _this.rootPage = 'WelcomePage';
            }
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.buscarUsuario = function () {
        var _this = this;
        this.storage.get('user').then(function (user) {
            if (user != null) {
                _this.firebase.onTokenRefresh()
                    .subscribe(function (token) {
                    console.log('Token referscado' + token);
                    _this.auth.actualizarToken(token);
                });
                _this.storage.get('token').then(function (val) {
                    console.log('Token en storage' + val);
                    if (val == null) {
                        _this.firebase.getToken().then(function (token) {
                            console.log('Primer token' + token);
                            _this.auth.actualizarToken(token);
                        });
                    }
                });
                _this.rootPage = 'HomePage';
            }
            else {
                _this.rootPage = 'WelcomePage';
            }
        });
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform,
        StatusBar,
        SplashScreen,
        Storage,
        FCM,
        AuthServiceProvider,
        LocalNotifications,
        Http,
        UrlProvider])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map