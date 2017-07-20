import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import 'rxjs/add/operator/catch';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  clasificaciones: any;
  clasificacion: any;

  constructor(public navCtrl: NavController, 
    public http: Http, 
    private url:UrlProvider,
    private toastCtrl: ToastController ) {

    this.getClasificaciones();
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
