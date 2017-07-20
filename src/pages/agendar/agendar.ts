import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Http } from '@angular/http'
import { UrlProvider } from '../../providers/url/url';


/**
 * Generated class for the AgendarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-agendar',
  templateUrl: 'agendar.html',
})
export class AgendarPage {

  descripcion:string = null;
  fecha_termino_hora:any = null;
  fecha_termino_dia:any = null;
  fecha_inicio_hora:any = null;
  fecha_inicio_dia:any = null;
  label_fecha_inicio:string = null;
  label_fecha_termino:string = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private datePicker:DatePicker,
    private toastCtrl:ToastController,
    private http:Http,
    private url:UrlProvider) {
  }

  ionViewDidLoad() {

  }

  guardar(){
    if (this.label_fecha_inicio == null || this.label_fecha_termino == null || this.descripcion == null) {
      this.presentToast('Todos los campos son requeridos');
    }else{
      let data = {
        id_bitacora: this.navParams.get('id_bitacora'),
        descripcion_agenda: this.descripcion,
        fecha_inicio: this.label_fecha_inicio,
        fecha_termino: this.label_fecha_termino
      };
      this.http.post(this.url.url + 'api/v1/Agenda', JSON.stringify(data))
        .subscribe(data => {
          console.log(data && data.json() == true);
          if (data.status == 201) {
            this.navCtrl.pop();
            this.presentToast('Evento guardado correntamente');
          }
        });
    }
  }

  openDateTime(type, inicio){
    this.datePicker.show({
      date: new Date(),
      mode: type,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        console.log('Got date: ', date);
        if(inicio){
          if (type == 'date') { 
            this.fecha_inicio_dia = date;
            if (this.fecha_inicio_hora != null) {
              this.fecha_inicio_dia.setHours(this.fecha_inicio_hora.getHours());
              this.fecha_inicio_dia.setMinutes(this.fecha_inicio_hora.getMinutes());
              this.label_fecha_inicio = this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#",this.fecha_inicio_dia);
            }
          } else {
            this.fecha_inicio_hora = date;
            if (this.fecha_inicio_dia != null) {
              this.fecha_inicio_dia.setHours(this.fecha_inicio_hora.getHours());
              this.fecha_inicio_dia.setMinutes(this.fecha_inicio_hora.getMinutes());
              this.label_fecha_inicio = this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#",this.fecha_inicio_dia);
            }
          }
        }else{
          if (type == 'date') { 
            this.fecha_termino_dia = date;
            if (this.fecha_termino_hora != null) {
              this.fecha_termino_dia.setHours(this.fecha_termino_hora.getHours());
              this.fecha_termino_dia.setMinutes(this.fecha_termino_hora.getMinutes());
              this.label_fecha_termino = this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#",this.fecha_termino_dia);
            }
          } else {
            this.fecha_termino_hora = date;
            if (this.fecha_termino_dia != null) {
              this.fecha_termino_dia.setHours(this.fecha_termino_hora.getHours());
              this.fecha_termino_dia.setMinutes(this.fecha_termino_hora.getMinutes());
              this.label_fecha_termino = this.formatDate("#YYYY#-#MM#-#DD# #hh#:#mm#:#ss#",this.fecha_termino_dia);
            }
          }
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
}


//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
//*** Reuse or modification is free provided you abide by the terms of that license.
//*** (Including the first two lines above in your source code satisfies the conditions.)

// Include this code (with notice above ;) in your library; read below for how to use it.



/****************************************************************************

myDateObject.customFormat(formatString)
-------------------------------------------------
arguments:
  myDateObject - a JavaScript Date object
  formatString - a string containing one or more tokens to be replaced
  

returns:
  a new string based on formatString, with all valid tokens replaced with
  values from dateObject
  

description:
  Use customFormat(...) to format a Date object in anyway you like.
  Any token (from the list below) gets replaced with the corresponding value.
  

  token:     description:             example:
  #YYYY#     4-digit year             1999
  #YY#       2-digit year             99
  #MMMM#     full month name          February
  #MMM#      3-letter month name      Feb
  #MM#       2-digit month number     02
  #M#        month number             2
  #DDDD#     full weekday name        Wednesday
  #DDD#      3-letter weekday name    Wed
  #DD#       2-digit day number       09
  #D#        day number               9
  #th#       day ordinal suffix       nd
  #hhhh#     2 digit military hour    17
  #hhh#      military/24-based hour   17
  #hh#       2-digit hour             05
  #h#        hour                     5
  #mm#       2-digit minute           07
  #m#        minute                   7
  #ss#       2-digit second           09
  #s#        second                   9
  #ampm#     "am" or "pm"             pm
  #AMPM#     "AM" or "PM"             PM
  

notes:
  If you want the current date and time, use "new Date()".
  e.g.
  var curDate = new Date();
  curDate.customFormat("#DD#/#MM#/#YYYY#");
  

  If you want all-lowercase or all-uppercase versions of the weekday/month,
  use the toLowerCase() or toUpperCase() methods of the resulting string.
  e.g.
  curDate.customFormat("#DDDD#, #MMMM# #D#, #YYYY#").toLowerCase();

  If you use the same format in many places in your code, I suggest creating
  a wrapper function to this one, e.g.:
  Date.prototype.myDate=function(){
    return this.customFormat("#D#-#MMM#-#YYYY#").toLowerCase();
  }
  Date.prototype.myTime=function(){
    return this.customFormat("#h#:#mm##ampm#");
  }

  var now = new Date();
  alert(now.myDate());

  
examples:
  var now = new Date();
  var myString = now.customFormat("#YYYY#-#MM#-#DD#"); 
  alert(myString);
  -->1999-11-19
  
  var myString = now.customFormat("#DDD#, #MMM#-#D#-#YY#"); 
  alert(myString);
  -->Fri, Nov-19-99
  
  var myString = now.customFormat("#h#:#mm# #ampm#"); 
  alert(myString);
  -->4:34 pm

  var myString = now.customFormat("#hhh#:#mm#:#ss#"); 
  alert(myString);
  -->16:34:26

  var myString = now.customFormat("#DDDD#, #MMMM# #D##th#, #YYYY# @ #h#:#mm# #ampm#"); 
  alert(myString);
  -->Friday, November 19th, 1999 @ 4:34 pm
  
****************************************************************************/