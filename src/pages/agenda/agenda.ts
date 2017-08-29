import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the AgendaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-agenda',
  templateUrl: 'agenda.html',
})
export class AgendaPage {

  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
      mode: 'month',
      currentDate: new Date()
  };
  bitacora:any;

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams,
      private http:Http,
      private url:UrlProvider,
      private modalCtrl:ModalController) {
    this.bitacora = this.navParams.get('id_bitacora');
  }

  ionViewDidLoad() {
    this.loadEvents();
  }

  loadEvents() {
    this.http.get(this.url.url + 'api/v1/Agenda/' + this.bitacora)
      .subscribe(data => {
        if (data.status == 200) {
          var events = [];
          data.json().forEach((agenda, index) => {
            let revocada = agenda.estado_agenda == '0' ? '(Agenda revocada)' : '';
            let title = agenda.titulo + ' ' + revocada;
            let fechaInicio = new Date(agenda.fecha_inicio);
            let fechaTermino = new Date(agenda.fecha_termino);
            events.push({
              position: index,
              title: title,
              agenda: agenda,
              startTime: fechaInicio,
              endTime:fechaTermino,
              allDay: false
            });
          });
          this.eventSource = events;
        }
      });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
  onEventSelected(event) {
    this.abrirDetalle(this.eventSource[event.position]);
    //console.log(event);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }
  today() {
    this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
    //console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
              //(ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }
  onCurrentDateChanged(event:Date) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    event.setHours(0, 0, 0, 0);
    this.isToday = today.getTime() === event.getTime();
  }
  onRangeChanged(ev) {
    //console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date:Date) => {
    var current = new Date();
    current.setHours(0, 0, 0);
    return date < current;
  };
  abrirDetalle(event){
    let detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage',{
      titulo:event.title,
      detalle: event.agenda.descripcion_agenda,
      tipo: 'agenda',
      agenda: event.agenda,
      puede_revocar:true
    });
    detalleModal.onDidDismiss(data => {
      if (data.agenda_revocada) {
        this.navCtrl.pop();
      }
    });
    detalleModal.present();
  }
}
