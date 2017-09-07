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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PersonasDataProvider } from '../../providers/personas-data/personas-data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the CrearTareaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CrearTareaPage = (function () {
    function CrearTareaPage(navCtrl, navParams, personasData, datePicker, toastCtrl, http, url) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.personasData = personasData;
        this.datePicker = datePicker;
        this.toastCtrl = toastCtrl;
        this.http = http;
        this.url = url;
        this.palabraClave = '';
        this.buscando = false;
        this.label_fecha_inicio = null;
        this.label_fecha_termino = null;
        this.busquedaControl = new FormControl();
    }
    CrearTareaPage.prototype.guardar = function () {
        var _this = this;
        console.log(this.items[this.itemSeleccionado].id_usuario);
        if (this.label_fecha_inicio == null || this.label_fecha_termino == null || this.descripcion == null || this.itemSeleccionado == null) {
            this.presentToast('Todos los campos son requeridos');
        }
        else {
            var data = {
                id_bitacora: this.navParams.get('id_bitacora'),
                id_usuario_asignado: this.items[this.itemSeleccionado].id_usuario,
                detalle_tarea: this.descripcion,
                fecha_inicio_tarea: this.label_fecha_inicio,
                fecha_termino_tarea: this.label_fecha_termino
            };
            this.http.post(this.url.url + 'api/v1/Tareas', JSON.stringify(data))
                .subscribe(function (data) {
                console.log(data);
                if (data.status == 201) {
                    _this.navCtrl.pop();
                    _this.presentToast('Tarea guardada correntamente');
                }
            });
        }
    };
    CrearTareaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.setFilteredItems();
        this.busquedaControl.valueChanges.debounceTime(700).subscribe(function (busqueda) {
            _this.buscando = false;
            _this.setFilteredItems();
        });
    };
    CrearTareaPage.prototype.onSearchInput = function () {
        this.buscando = true;
    };
    CrearTareaPage.prototype.setFilteredItems = function () {
        this.items = this.personasData.filtrarDatos(this.palabraClave);
    };
    CrearTareaPage.prototype.seleccionarUsuario = function (idUsuario, i) {
        this.itemSeleccionado = i;
    };
    CrearTareaPage.prototype.seleccionado = function (index) {
        return index === this.itemSeleccionado;
    };
    CrearTareaPage.prototype.puedeCrear = function () {
        return this.descripcion;
    };
    CrearTareaPage.prototype.openDateTime = function (inicio) {
        var _this = this;
        this.datePicker.show({
            date: new Date(),
            mode: 'date',
            androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
        }).then(function (date) {
            if (inicio) {
                _this.label_fecha_inicio = _this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#", date);
            }
            else {
                _this.label_fecha_termino = _this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#", date);
            }
        }, function (err) { return console.log('Error occurred while getting date: ', err); });
    };
    CrearTareaPage.prototype.formatDate = function (formatString, date) {
        var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
        var dateObject = date;
        YY = ((YYYY = dateObject.getFullYear()) + "").slice(-2);
        MM = (M = dateObject.getMonth() + 1) < 10 ? ('0' + M) : M;
        MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
        DD = (D = dateObject.getDate()) < 10 ? ('0' + D) : D;
        DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateObject.getDay()]).substring(0, 3);
        th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
        formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
        h = (hhh = dateObject.getHours());
        if (h == 0)
            h = 24;
        if (h > 12)
            h -= 12;
        hh = h < 10 ? ('0' + h) : h;
        hhhh = hhh < 10 ? ('0' + hhh) : hhh;
        AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
        mm = (m = dateObject.getMinutes()) < 10 ? ('0' + m) : m;
        ss = (s = dateObject.getSeconds()) < 10 ? ('0' + s) : s;
        return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
    };
    CrearTareaPage.prototype.presentToast = function (title) {
        var toast = this.toastCtrl.create({
            message: title,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            //console.log('Dismissed toast');
        });
        toast.present();
    };
    return CrearTareaPage;
}());
CrearTareaPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-crear-tarea',
        templateUrl: 'crear-tarea.html',
    }),
    __metadata("design:paramtypes", [NavController,
        NavParams,
        PersonasDataProvider,
        DatePicker,
        ToastController,
        Http,
        UrlProvider])
], CrearTareaPage);
export { CrearTareaPage };
//# sourceMappingURL=crear-tarea.js.map