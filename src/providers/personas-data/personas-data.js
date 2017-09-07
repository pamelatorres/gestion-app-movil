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
import 'rxjs/add/operator/map';
import { UrlProvider } from '../../providers/url/url';
/*
  Generated class for the PersonasDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var PersonasDataProvider = (function () {
    function PersonasDataProvider(http, url) {
        var _this = this;
        this.http = http;
        this.url = url;
        this.items = [];
        this.http.get(this.url.url + 'api/v1/PersonasCargos')
            .subscribe(function (data) {
            if (data.status == 200) {
                data.json().forEach(function (persona) {
                    var title = '<span class="nombre-persona">'
                        + persona.nombre_pers + ' '
                        + persona.paterno_pers + '</span>'
                        + '<br><span class="cargo-persona">' + persona.nombre_cargo + '</span>'
                        + '<br><span class="departamento-persona"> Departamento de '
                        + persona.nombre_depto + '</span>';
                    _this.items.push({ title: title,
                        id_usuario: persona.id_usuario
                    });
                });
                console.log(_this.items);
            }
        });
    }
    PersonasDataProvider.prototype.filtrarDatos = function (palabraClave) {
        return this.items.filter(function (item) {
            return item.title.toLowerCase().indexOf(palabraClave.toLowerCase()) > -1;
        });
    };
    return PersonasDataProvider;
}());
PersonasDataProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http,
        UrlProvider])
], PersonasDataProvider);
export { PersonasDataProvider };
//# sourceMappingURL=personas-data.js.map