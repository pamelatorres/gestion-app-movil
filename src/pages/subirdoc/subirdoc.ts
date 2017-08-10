import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Loading, AlertController } from 'ionic-angular';
import { FileChooser } from '@ionic-native/file-chooser';
import { Http } from '@angular/http';
import { File, FileEntry } from '@ionic-native/file';
//import { FilePath } from '@ionic-native/file-path';
import { Transfer } from '@ionic-native/transfer';
import { UrlProvider } from '../../providers/url/url';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs";


/**
 * Generated class for the SubirdocPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-subirdoc',
  templateUrl: 'subirdoc.html',
})
export class SubirdocPage {

	fileSrc: any = null;
	filename: any;
	incidente: any;
	loading: Loading;
	descripcion: any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public fileChooser:FileChooser,
  	public http:Http,
  	private transfer: Transfer, 
  	private file: File,
  	private url:UrlProvider,
  	private loadingCtrl:LoadingController,
  	private alertCtrl:AlertController) {

  	this.incidente = this.navParams.get('id_incidente');
  }

  ionViewDidLoad() {
  }

  public abrirFileChooser(){
  	this.fileChooser.open()
  		.then(uri => {
  			this.fileSrc = uri;
  			this.filename = decodeURIComponent(uri).split("/").pop();
  			console.log(this.fileSrc);
  			console.log(this.filename);
  		})
  		.catch(error => console.log(error));
  }

  public subirDoc(descripcion:string){
  	if (this.fileSrc != null) {
  		this.descripcion = descripcion;
  		this.loading = this.loadingCtrl.create({
      	content: 'Subiendo documentación'
    	});
    	this.loading.present();
    	console.log(this.fileSrc);
  		this.file.resolveLocalFilesystemUrl(this.fileSrc)
  			.then(entry => (<FileEntry> entry).file(file => this.readFile(file)))
  			.catch(erro => {
  				console.log(erro);
  				this.loading.dismiss();
  				this.presentToast('error');
  			});
  	}
  }
  presentToast(title) {
	  this.alertCtrl.create({
	    title: 'Documentación',
      subTitle: title,
      buttons:['Aceptar']
	  }).present();
	}

  private readFile(file: any){
  	const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      console.log(imgBlob);
      formData.append('file', imgBlob, file.name);
      formData.append('id_incidente',this.incidente);
      formData.append('id_persona_anexo','1');
      formData.append('tipo_anexo','documento');
      formData.append('descripcion_anexo',this.descripcion);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData){
  	this.http.post(this.url.url + "api/v1/uploads", formData)
      .catch((e) => this.handleError(e))
      .finally(() => this.loading.dismiss())
      .subscribe(data => {
      	console.log(data);
      });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      console.log(body);
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }
}
