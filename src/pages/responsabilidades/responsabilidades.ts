import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { HomePage } from '../home/home';
import { UrlProvider } from '../../providers/url/url';


/**
 * Generated class for the ResponsabilidadesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-responsabilidades',
  templateUrl: 'responsabilidades.html',
})
export class ResponsabilidadesPage {

	public clasificacion;
  clasificaciones: any;
  responsabilidades: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http,
    private url:UrlProvider) {
  	this.clasificacion = navParams.get("clasificacion");
    this.getResponsabilidades();
  }

  getResponsabilidades(){
    this.http.get(this.url.url + 'api/v1/responsabilidades/' + this.clasificacion)
      .subscribe(data => {
        this.responsabilidades = data.json();
        //console.log(this.responsabilidades);
      });
  }

  ionViewDidLoad() {
  	//console.log(this.clasificacion);
    //console.log('ionViewDidLoad ResponsabilidadesPage');
  }

  abrirMapa(responsabilidad){
    //console.log(name);
    this.navCtrl.push('MapPage',{
      responsabilidad: responsabilidad
    });
  }

  backButtonAction(){
    /* exits the app, since this is the main/first tab */
    // this.platform.exitApp();
    this.navCtrl.setRoot(HomePage);
  }
}
