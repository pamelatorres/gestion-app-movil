import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarEvent } from 'angular-calendar';

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

	public date: Date = new Date(Date.now());
	days_label: Array<string> = [
    'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'
  ];

  constructor(public navCtrl: NavController, 
  		public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

}
