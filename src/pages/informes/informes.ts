import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Http } from '@angular/http';
import { UrlProvider } from '../../providers/url/url';

/**
 * Generated class for the InformesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-informes',
  templateUrl: 'informes.html',
})
export class InformesPage {

  @ViewChild('barCanvas') barCanvas;
 
  barChart: any;
  labels: any = new Array;
  data:any = new Array;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private http:Http,
    private url:UrlProvider) {
  }

  ionViewDidLoad() {
    this.http.get(this.url.url + 'api/v1/InformeEficacia')
      .subscribe(data => {
        if(data.status >= 200){
          data.json().forEach(fila => {
            this.labels.push(fila.nombre_responsabilidad);
            this.data.push(fila.eficacia);
          });
          this.cargarInforme();
        }
      });
  }

  cargarInforme(){
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'polarArea',
      data: {
        labels: this.labels,
        datasets: [{
          label: '# días promedio',
          data: this.data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }
}
