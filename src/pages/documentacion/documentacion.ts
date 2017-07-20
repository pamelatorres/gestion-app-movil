import { Component } from '@angular/core';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs";
import { IonicPage, 
	NavController, 
	NavParams, 
	ToastController, 
	AlertController, 
	Platform, 
	LoadingController, 
	Loading } from 'ionic-angular';
import { File, FileEntry } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Http, Response } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { UrlProvider } from '../../providers/url/url';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the DocumentacionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-documentacion',
  templateUrl: 'documentacion.html',
})
export class DocumentacionPage {

	lastImage: string = null;
  loading: Loading;
  incidente: any;
  user:any;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	public toastCtrl: ToastController,
  	private alertCtrl: AlertController,
  	private camera: Camera, 
  	private transfer: Transfer, 
  	private file: File, 
  	private filePath: FilePath, 
  	public platform: Platform, 
  	public loadingCtrl: LoadingController,
  	public http: Http,
  	private url:UrlProvider,
  	private mediaCapture:MediaCapture,
    private storage:Storage) {

  	this.incidente = navParams.get('id_incidente');
    this.storage.get('user')
      .then(user => this.user = user);
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DocumentacionPage');
    //this.presentToast('Incidente generado exitosamente');
  }

  presentToast(title) {
	  let toast = this.toastCtrl.create({
	    message: title,
	    duration: 3000,
	    position: 'bottom'
	  });

	  toast.onDidDismiss(() => {
	    //console.log('Dismissed toast');
	  });

	  toast.present();
	}

	describirIncidenteAlert() {
	  let alert = this.alertCtrl.create({
	    title: 'Describir incidente',
	    inputs: [
	      {
	        name: 'descripcion',
	        placeholder: 'Descripcion',
	        type: 'text-area'
	      }
	    ],
	    buttons: [
	      {
	        text: 'Cancelar',
	        role: 'cancel',
	        handler: data => {

	        }
	      },
	      {
	        text: 'Ingresar',
	        handler: data => {
	          //console.log(data);
	          this.describir(data);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	public takePicture(sourceType) {
	  var options = {
	    quality: 75,
	    sourceType: sourceType,
	    destinationType: this.camera.DestinationType.FILE_URI,
	    saveToPhotoAlbum: false,
      targetWidth: 100,
  		targetHeight: 100,
	    correctOrientation: true,
	  };
	  this.camera.getPicture(options).then((imagePath) => {
	  	this.loading = this.loadingCtrl.create({
      	content: 'Subiendo documentación'
    	});
    	this.loading.present();
	  	this.uploadPhoto(imagePath);
	  }, (err) => {
	  	console.log(JSON.stringify(err));
	  });
	}

  private uploadPhoto(imageFileUri: any): void {
    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file)))
      .catch(err => this.presentToast(err));
  }

  private readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      console.log(imgBlob);
      formData.append('file', imgBlob, file.name);
      formData.append('id_incidente',this.incidente);
      formData.append('id_persona_anexo',this.user.id_usuario);
      formData.append('descripcion_anexo','');
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData: FormData) {
    this.http.post(this.url.url + "api/v1/uploads", formData)
      .catch((e) => this.handleError(e))
      .finally(() => this.loading.dismiss())
      .subscribe(data => {
      	if (data.status == 201) {
      		this.presentToast('Datos guardados correctamente');
      	};
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

	// Create a new name for the image
/*	private createFileName() {
	  var d = new Date(),
	  n = d.getTime(),
	  newFileName =  n + ".jpg";
	  //console.log(newFileName);
	  return newFileName;
	}*/

	public describir(data){
		let describir = {
			id_incidente: this.incidente,
			id_persona_anexo: this.user.id_usuario,
			descripcion_anexo: data['descripcion']
		};
		this.http.post(this.url.url + 'api/v1/documentacion', JSON.stringify(describir))
			.subscribe(data => {
				if (data.status == 201) {
					this.presentToast('Datos guardados correctamente');
				}
				//console.log(data);
			});
	}
	public subirDocumentacion(){
		this.navCtrl.push('SubirdocPage',{
			id_incidente: this.incidente
		});
	}

	public verDocumentacion(){
		this.navCtrl.push('DocsPage',{
			id_incidente: this.incidente
		});
	}

	public captureVideo(){
		let options: CaptureVideoOptions = {
			limit:1,
			duration: 30,
			quality: 30
		};
		this.mediaCapture.captureVideo(options)
			.then(
    	(data: MediaFile[]) => {
    		this.loading = this.loadingCtrl.create({
  	    	content: 'Subiendo documentación'
	    	});
    		this.loading.present();
    		this.uploadPhoto(data[0]['fullPath']);
    	},
    	(err: CaptureError) => console.error(err)
  	);
	}
}
