import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ClasificacionProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ClasificacionProvider {

	data1: any;

  constructor(public http: Http) {
    console.log('Hello ClasificacionProvider Provider');
  }

  load(){
  	if(this.data1){
  		return Promise.resolve(this.data1);
  	}

  	return new Promise(resolve => {
  		this.http.get('https://randomuser.me/api/?results=10')
  			.map(res => res.json)
  			.subscribe(data => {
  				this.data1 = data;
  				resolve(this.data1);
  			});
  	});
  }
}
