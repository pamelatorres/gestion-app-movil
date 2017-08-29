import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UrlProvider } from '../../providers/url/url';
import { Storage } from '@ionic/storage';


/*
  Generated class for the PersonasDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PersonasDataProvider {

  items:any;
  user:any;

  constructor(public http: Http,
    private url:UrlProvider,
    private storage:Storage) {
    this.storage.get('user')
      .then(user => {
        this.user = user;
      });
    this.items = [];
    this.http.get(this.url.url + 'api/v1/PersonasCargos')
      .subscribe(data => {
        if (data.status == 200) {
          data.json().forEach(persona => {
            let title = '<span class="nombre-persona">' 
              + persona.nombre_pers + ' '
              + persona.paterno_pers +'</span>' 
              + '<br><span class="cargo-persona">' + persona.nombre_cargo + '</span>' 
              + '<br><span class="departamento-persona"> Departamento de ' 
              + persona.nombre_depto + '</span>';
            this.items.push({title: title,
              id_usuario: persona.id_usuario,
              usuario: persona
            });
          });
        }
      });
  }

  filtrarDatos(palabraClave,opt){
    // opt == 0 muestra todos los items
    // opt == 1 muestra solo los jefes
    // opt == 2 muestra items por departamento y jefes
    return this.items.filter((item) => {
      console.log(item.usuario.id_usuario != this.user.id_usuario);
      if (opt == 1) {
        if (item.usuario.nivel_jerarquico == '1'
          && item.usuario.id_usuario != this.user.id_usuario) {
          return item.title.toLowerCase().indexOf(palabraClave.toLowerCase()) > -1;
        }
      }else if(opt == 0){
        return item.title.toLowerCase().indexOf(palabraClave.toLowerCase()) > -1;
      }else if(opt == 2){
        if (this.user.nombre_depto == item.usuario.nombre_depto
          || item.usuario.nivel_jerarquico == '1') {
          if (item.usuario.id_usuario != this.user.id_usuario) {
            return item.title.toLowerCase().indexOf(palabraClave.toLowerCase()) > -1;          
          }
        }
      }
    });
  }
}
