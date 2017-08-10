import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UrlProvider } from '../../providers/url/url';


/*
  Generated class for the PersonasDataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class PersonasDataProvider {

  items:any;

  constructor(public http: Http,
    private url:UrlProvider) {
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
              id_usuario: persona.id_usuario
            });
          });
          console.log(this.items);
        }
      });
  }

  filtrarDatos(palabraClave){
    return this.items.filter((item) => {
      return item.title.toLowerCase().indexOf(palabraClave.toLowerCase()) > -1;
    });
  }
}
