import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AgendaPage } from '../agenda/agenda';
import { DerivarresPage } from '../derivarres/derivarres';
import { VbPage } from '../vb/vb';
import { SubirdocPage } from '../subirdoc/subirdoc';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
import { CrearBitacoraPage } from '../crear-bitacora/crear-bitacora';
import { TruncatePipe } from '../../pipes/truncate/truncate';


/**
 * Generated class for the BitacoraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bitacora',
  templateUrl: 'bitacora.html',
})
export class BitacoraPage {

  textos = Array();
  docs:any;
  fotos = Array();
  videos = Array();
  documentos = Array();
  incidente = 50;
  shownGroup = null;
  public bitacora:any;

	now: string = new Date().toJSON();
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider,
    private modalCtrl:ModalController) {
    console.log(this.navParams.get('bitacora'));
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

  irA(page) {
    this.navCtrl.push(page,{
      id_bitacora:this.bitacora.id_bitacora
    });
  }

  abrirDetalle(){
    let detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage',{
      detalle: this.bitacora.observacion
    });
    detalleModal.present();
  }
}
