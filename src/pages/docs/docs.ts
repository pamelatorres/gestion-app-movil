import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { PhotoViewer } from '@ionic-native/photo-viewer';


/**
 * Generated class for the DocsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-docs',
  templateUrl: 'docs.html',
})
export class DocsPage {

	docs:any;
	fotos = Array();
	videos = Array();
	documentos = Array();
	incidente:any;
  shownGroup = null;

  constructor(public navCtrl: NavController, 
  	public navParams: NavParams,
  	private http:Http,
  	private url:UrlProvider,
    private imageViewer:PhotoViewer) {
  	this.incidente = this.navParams.get('id_incidente');
  	this.getDocs();
  }

  getDocs(){
  	this.http.get(this.url.url + 'api/v1/documentacion/' + this.incidente)
      .subscribe(data => {
      		let datajson = data.json();
      		for(var i = datajson.length - 1; i >= 0; i--) {
      			let doc = datajson[i];
      			switch (doc.tipo_anexo) {
      				case "foto":
      					this.fotos.push(doc);
      					break;
      				case "video":
                this.videos.push(doc);
                break;
              case "documento":
                this.documentos.push(doc);
                break;
      				default:
      					// code...
      					break;
      			}
      		};
      });
  }

  ionViewDidLoad() {
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
        this.shownGroup = null;
    } else {
        this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };

  openImage(url){
    this.imageViewer.show(this.url.url + 'api/v1/ServeImages/' + encodeURIComponent(url).slice(0,-4));
  }
}
