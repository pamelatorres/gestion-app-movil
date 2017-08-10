import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import 'rxjs/add/operator/catch';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-clasificaiones',
  templateUrl: 'clasificaiones.html',
})
export class ClasificaionesPage {

  clasificaciones: any;
  clasificacion: any;

  constructor(public navCtrl: NavController, 
    public http: Http, 
    private url:UrlProvider,
    private toastCtrl: ToastController,
    private storage:Storage ) {

    this.getClasificaciones();
    this.storage.get('token').then(token => {
      console.log('Primer token home ' + token);
    });
  }

  getClasificaciones(){
    let query = this.http.get(this.url.url + 'api/v1/clasificaciones');
      query.subscribe(data => {
          this.clasificaciones = data.json();
      });
      query.catch(this.handleError);
  }

  private handleError(error:any): Promise<any>{
    console.error('Ha acurrido un error', error);
    return Promise.reject(error.message || error);
  }

  abrirResponsabilidades(name:string){
    //console.log(name);
    this.navCtrl.push('ResponsabilidadesPage',{
      clasificacion: name
    });
  }
}
