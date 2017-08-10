import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the AgendasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-agendas',
  templateUrl: 'agendas.html',
})
export class AgendasPage {

  eventSource;
  viewTitle;
  isToday: boolean;
  calendar = {
      mode: 'month',
      currentDate: new Date()
  };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private url:UrlProvider,
              private http:Http,
              private modalCtrl:ModalController) {
  }

  ionViewDidLoad() {
    this.loadEvents();
  }
  loadEvents() {
    this.http.get(this.url.url + 'api/v1/Agendas')
      .subscribe(data => {
        if (data.status == 200) {
          var events = [];
          data.json().forEach((agenda, index) => {
            let fechaInicio = new Date(agenda.fecha_inicio);
            let fechaTermino = new Date(agenda.fecha_termino);
            events.push({
              position: index,
              title: agenda.titulo,
              descripcion: agenda.descripcion_agenda,
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
    this.abrirDetalle(this.eventSource[event.position].descripcion);
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
  abrirDetalle(descripcion){
    //console.log(descripcion);
    let detalleModal = this.modalCtrl.create('BitacoraDetalleModalPage',{
      detalle: descripcion
    });
    detalleModal.present();
  }
}
