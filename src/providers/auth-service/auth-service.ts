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

export class User{
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  } 
}

@Injectable()
export class AuthServiceProvider {

  errorCredencialesVacias = 'Por favor ingrese credenciales';
  currentUser: User;

  public login(creadentials){
    if (creadentials.email === null || creadentials.password === null) {
      return Observable.throw(this.errorCredencialesVacias);
    }else{
      return Observable.create(observer => {
        this.http.post(this.url.url + 'api/v1/Login', JSON.stringify(creadentials)).subscribe(data => {
          console.log(data);
          if (data.status == 201 && data.json().success) {
            this.storage.set('user',data.json());
            observer.next(true);
            observer.complete(); 
          }else{
            observer.next(false);
            observer.complete();
          }
        });
      });
    }
  }

  public register(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw(this.errorCredencialesVacias);
    } else {
      // At this point store the credentials to your backend!
      return Observable.create(observer => {
        observer.next(true);
        observer.complete();
      });
    }
  }
  public getUserInfo() : User {
    return this.currentUser;
  }
   
  public logout() {
    return Observable.create(observer => {
      this.currentUser = null;
      observer.next(true);
      observer.complete();
    });
  }
  // ERROR ARREGLAR
  public actualizarToken(token){
    this.storage.get('user')
      .then(user => {
        let data = {
          id_usuario: user.id_usuario,
          token: token
        };
        this.http.post(this.url.url + 'api/v1/Token', JSON.stringify(data)).subscribe(data =>{
          console.log(data);
          if (data.status == 201 && data.json() == true) { 
            this.storage.set('token',token);
          }
        });
      });
  }
  constructor(public http: Http, 
    public storage:Storage,
    private url:UrlProvider) {
  }
}
