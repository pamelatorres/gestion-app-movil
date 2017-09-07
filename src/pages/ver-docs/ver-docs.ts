import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams 
} from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the VerDocsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ver-docs',
  templateUrl: 'ver-docs.html',
})
export class VerDocsPage {

  textos = Array();
  docs:any;
  fotos = Array();
  videos = Array();
  documentos = Array();
  shownGroup = null;
  bitacora:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider) {
    this.bitacora = this.navParams.get('bitacora');
    this.getDocs();
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

  getDocs(){
    this.http.get(this.url.url + 'api/v1/documentacion/' + this.bitacora.id_incidente)
      .subscribe(data => {
          let datajson = data.json();
          console.log(datajson);
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
              case "texto":
                this.textos.push(doc);
              default:
                // code...
                break;
            }
          };
      });
  }
}
