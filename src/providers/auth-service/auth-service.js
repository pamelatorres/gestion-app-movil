var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { UrlProvider } from '../../providers/url/url';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var User = (function () {
    function User(name, email) {
        this.name = name;
        this.email = email;
    }
    return User;
}());
export { User };
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http, storage, url) {
        this.http = http;
        this.storage = storage;
        this.url = url;
        this.errorCredencialesVacias = 'Por favor ingrese credenciales';
    }
    AuthServiceProvider.prototype.login = function (creadentials) {
        var _this = this;
        if (creadentials.email === null || creadentials.password === null) {
            return Observable.throw(this.errorCredencialesVacias);
        }
        else {
            return Observable.create(function (observer) {
                _this.http.post(_this.url.url + 'api/v1/Login', JSON.stringify(creadentials)).subscribe(function (data) {
                    console.log(data);
                    if (data.status == 201 && data.json().success) {
                        _this.storage.set('user', data.json());
                        observer.next(true);
                        observer.complete();
                    }
                    else {
                        observer.next(false);
                        observer.complete();
                    }
                });
            });
        }
    };
    AuthServiceProvider.prototype.register = function (credentials) {
        if (credentials.email === null || credentials.password === null) {
            return Observable.throw(this.errorCredencialesVacias);
        }
        else {
            // At this point store the credentials to your backend!
            return Observable.create(function (observer) {
                observer.next(true);
                observer.complete();
            });
        }
    };
    AuthServiceProvider.prototype.getUserInfo = function () {
        return this.currentUser;
    };
    AuthServiceProvider.prototype.logout = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.currentUser = null;
            observer.next(true);
            observer.complete();
        });
    };
    // ERROR ARREGLAR
    AuthServiceProvider.prototype.actualizarToken = function (token) {
        var _this = this;
        this.storage.get('user')
            .then(function (user) {
            var data = {
                id_usuario: user.id_usuario,
                token: token
            };
            _this.http.post(_this.url.url + 'api/v1/Token', JSON.stringify(data)).subscribe(function (data) {
                console.log(data);
                if (data.status == 201 && data.json() == true) {
                    _this.storage.set('token', token);
                }
            });
        });
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        Storage,
        UrlProvider])
], AuthServiceProvider);
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map