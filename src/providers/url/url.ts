import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the UrlProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UrlProvider {

  constructor(private http: Http) {
  }

  public url:string = "http://pgm.modulonet.cl:8000/index.php/";
}
