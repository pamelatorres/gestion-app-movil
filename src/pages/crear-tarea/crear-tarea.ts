import { Component } from '@angular/core';
import { IonicPage, 
  NavController, 
  NavParams, 
  AlertController,
  LoadingController } from 'ionic-angular';
import { PersonasDataProvider } from '../../providers/personas-data/personas-data';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker';
import { Http } from '@angular/http'
import { UrlProvider } from '../../providers/url/url';
/**
 * Generated class for the CrearTareaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-crear-tarea',
  templateUrl: 'crear-tarea.html',
})
export class CrearTareaPage {

  palabraClave = '';
  busquedaControl: FormControl;
  items:any;
  buscando: any = false;
  itemSeleccionado:number;
  descripcion:string;
  label_fecha_inicio:string = null;
  label_fecha_termino:string = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private personasData:PersonasDataProvider,
    private datePicker:DatePicker,
    private alertCtrl:AlertController,
    private http:Http,
    private url:UrlProvider,
    private loadCtrl:LoadingController) {

    this.busquedaControl = new FormControl();
  }
  guardar(){
    let loading = this.loadCtrl.create({
      content:'Por favor espere'
    });
    loading.present();
    if (this.label_fecha_inicio == null || this.label_fecha_termino == null || this.descripcion == null || this.itemSeleccionado == null) {
      this.presentToast('Todos los campos son requeridos');
    }else{
      let data = {
        id_bitacora: this.navParams.get('id_bitacora'),
        id_usuario_asignado: this.items[this.itemSeleccionado].id_usuario,
        detalle_tarea: this.descripcion,
        fecha_inicio_tarea: this.label_fecha_inicio,
        fecha_termino_tarea: this.label_fecha_termino
      };
      this.http.post(this.url.url + 'api/v1/Tareas', JSON.stringify(data))
        .subscribe(data => {
          loading.dismiss();
          if (data.status == 201) {
            this.navCtrl.pop();
            this.presentToast('Tarea guardada correntamente');
          }
        });
    }
  }
  ionViewDidLoad() {
    this.setFilteredItems();
    this.busquedaControl.valueChanges.debounceTime(700).subscribe(busqueda => {
      this.buscando = false;
      this.setFilteredItems();
    });
  }

  onSearchInput(){
    this.buscando = true;
  }

  setFilteredItems(){
    this.items = this.personasData.filtrarDatos(this.palabraClave,2);
  }

  seleccionarUsuario(idUsuario,i){
    this.itemSeleccionado = i;
  }

  seleccionado(index):boolean{
    return index === this.itemSeleccionado;
  }

  puedeCrear(){
    return this.descripcion;
  }
  openDateTime(inicio){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        if (inicio) {
          this.label_fecha_inicio = this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#",date);
        }else{
          this.label_fecha_termino = this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#",date);
        }
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  formatDate(formatString:string, date:Date) : string{
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    var dateObject = date;
    YY = ((YYYY=dateObject.getFullYear())+"").slice(-2);
    MM = (M=dateObject.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=dateObject.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dateObject.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);

    h=(hhh=dateObject.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=dateObject.getMinutes())<10?('0'+m):m;
    ss=(s=dateObject.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
  }
  presentToast(title) {
    this.alertCtrl.create({
      title:'Crear tarea',
      message: title,
      buttons:['Aceptar']
    }).present();
  }
}
