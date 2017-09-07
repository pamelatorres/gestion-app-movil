import { Component, ViewChild } from '@angular/core';
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
	Loading,
  ActionSheetController,
  Content,
<<<<<<< HEAD
  ViewController } from 'ionic-angular';
=======
  Scroll } from 'ionic-angular';
>>>>>>> master
import { File, FileEntry } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Http, Response } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { UrlProvider } from '../../providers/url/url';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { Storage } from '@ionic/storage';
import { PhotoViewer } from '@ionic-native/photo-viewer';

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

  @ViewChild(Content) content:Content;
	lastImage:any;
  loading: Loading;
  incidente: any;
  user:any;
  anexos:any = new Array;
  bitacora:any = {};
  mensaje:string = '';
  limit:number = 0;
<<<<<<< HEAD
  incidenteCreado:boolean = false;
=======
>>>>>>> master

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
    private storage:Storage,
    private actionCtrl:ActionSheetController,
<<<<<<< HEAD
    private imageViewer:PhotoViewer,
    private viewCtrl:ViewController) {

  	this.incidente = navParams.get('id_incidente');
    this.bitacora = navParams.get('bitacora');
    this.incidenteCreado = navParams.get('incidente_creado');
=======
    private imageViewer:PhotoViewer) {

  	this.incidente = navParams.get('id_incidente');
    this.bitacora = navParams.get('bitacora');
>>>>>>> master
    this.storage.get('user')
      .then(user => {
        this.user = user;
        console.log(this.user);
      });
    this.obtenerIncidentes();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad DocumentacionPage');
    //this.presentToast('Incidente generado exitosamente');
  }

  presentToast(title) {
	  this.alertCtrl.create({
	    title:'Documentación',
      subTitle: title,
      buttons:[
        {
          text:'Aceptar'
        }
      ]
	  }).present();
	}

  ionViewDidEnter(){
    this.content.scrollToBottom(1000);
  }

  camaraOArchivo(){
    this.actionCtrl.create({
      title:'Subir imagen',
      buttons:[{
        text: 'Desde camara',
        handler:() =>{
          this.takePicture(this.camera.PictureSourceType.CAMERA)
        }
      },{
        text:'Desde archivo',
        handler:()=>{
          this.takePicture(this.camera.PictureSourceType.SAVEDPHOTOALBUM)
        }
      }]
    }).present()
  }

  obtenerIncidentes(){
    this.http.get(this.url.url + 'api/v1/documentacion/'+this.incidente+'/'+this.limit)
      .subscribe(data => {
        data.json().forEach(anexo => {
          if (anexo.tipo_anexo == 'foto') {
            anexo.src = this.url.url + 'api/v1/ServeImages/?image=' + anexo.ruta_anexo;
          }
          this.anexos.unshift(anexo);
        })
      });
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
	          //this.describir(data);
	        }
	      }
	    ]
	  });
	  alert.present();
	}

	public takePicture(sourceType) {
	  var options = {
	    quality: 50,
	    sourceType: sourceType,
	    destinationType: this.camera.DestinationType.FILE_URI,
	    saveToPhotoAlbum: false,
	    correctOrientation: true,
	  };
	  this.camera.getPicture(options).then((imagePath) => {
	  	this.loading = this.loadingCtrl.create({
      	content: 'Subiendo documentación'
    	});
    	this.loading.present();
      //this.loadImageAnexo(imagePath);
      this.lastImage = imagePath;
	  	this.uploadPhoto(imagePath,'foto');
	  }, (err) => {
	  	console.log(JSON.stringify(err));
	  });
	}

  loadImageAnexo(imagePath){
    this.anexos.push({
      descripcion_anexo: this.mensaje,
      fecha_incorporacion: new Date(),
      materno_pers:this.user.materno_pers,
      nombre_pers:this.user.nombre_pers,
      paterno_pers:this.user.paterno_pers,
      ruta_anexo:imagePath,
      tipo_anexo:'foto',
      src:imagePath
    });
    this.mensaje = '';
    setTimeout(() =>{
      this.content.scrollToBottom(300);
    },300);
  }

  private uploadPhoto(imageFileUri: any, tipo:string): void {
    this.file.resolveLocalFilesystemUrl(imageFileUri)
      .then(entry => (<FileEntry>entry).file(file => this.readFile(file,tipo)))
      .catch(err => this.presentToast(err));
  }

  private readFile(file: any, tipo) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      console.log(imgBlob);
      formData.append('file', imgBlob, file.name);
      formData.append('id_incidente',this.incidente);
      formData.append('id_persona_anexo',this.user.id_usuario);
      formData.append('tipo_anexo',tipo);
      formData.append('descripcion_anexo',this.mensaje);
      this.postData(formData);
    };
    reader.readAsArrayBuffer(file);
  }

  private postData(formData: FormData) {
    this.http.post(this.url.url + "api/v1/uploads", formData)
      .catch((e) => this.handleError(e))
      .finally(() => this.loading.dismiss())
      .subscribe(data => {
        console.log(data);
      	if (data.status == 201) {
      		this.presentToast('Datos guardados correctamente');
          this.loadImageAnexo(data.json().ruta_anexo);
       	};
      });
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      console.log(body);
      this.presentToast('A ocurrido un error, contacte al administrador del sistema');
    } else {
      errMsg = error.message ? error.message : error.toString();
      console.log(errMsg);
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

	public describir(){
		let describir = {
			id_incidente: this.incidente,
			id_persona_anexo: this.user.id_usuario,
			descripcion_anexo: this.mensaje,
      tipo_anexo: 'texto'
		};
		this.http.post(this.url.url + 'api/v1/documentacion', JSON.stringify(describir))
			.subscribe(data => {
				if (data.status == 201) {
          this.anexos.push({
            descripcion_anexo: this.mensaje,
            fecha_incorporacion: new Date(),
            materno_pers:this.user.materno_pers,
            nombre_pers:this.user.nombre_pers,
            paterno_pers:this.user.paterno_pers,
            ruta_anexo:null,
            tipo_anexo:'texto'
          });
          setTimeout(()=>{
            this.content.scrollToBottom(300);
          },300)
          this.mensaje = '';
          //this.presentToast('Datos guardados correctamente');
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
    		this.uploadPhoto(data[0]['fullPath'],'video');
    	},
    	(err: CaptureError) => console.error(err)
  	);
	}

  nada(){

  }

  doRefresh(event){
    this.limit = this.limit + 8;
    this.http.get(this.url.url + 'api/v1/documentacion/'+this.incidente+'/'+this.limit)
      .subscribe(data => {
        data.json().forEach(anexo => {
          console.log(anexo);
          if (anexo.tipo_anexo == 'foto') {
            anexo.src = this.url.url + 'api/v1/ServeImages/?image=' + anexo.ruta_anexo;
          }
          console.log(anexo);
          this.anexos.unshift(anexo);
        });
      });
    event.complete()
  }
  openImage(url){
    console.log(url);
    this.imageViewer.show(url);
  }
<<<<<<< HEAD

  ionViewCanLeave(){
    if (!this.incidenteCreado) {
      return true;
    }else{
      let r:boolean = null;
      if (this.anexos.length == 0) {
        this.alertCtrl.create({
          title:'Error',
          message:'Ingrese la descripción del incidente',
          buttons:['Aceptar']
        }).present();
        r = false;
      }else{
        const index = this.viewCtrl.index;
        this.navCtrl.remove(index);
        this.navCtrl.remove(index -1);
        r = true;
      }
      return r;
    }
  }
=======
>>>>>>> master
}
