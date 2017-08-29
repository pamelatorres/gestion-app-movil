import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Http } from '@angular/http';
import { UrlProvider } from '../providers/url/url';
//import { ListPage } from '../pages/list/list';
//import { ResponsabilidadesPage } from '../pages/responsabilidades/responsabilidades';
//import { MapPage } from '../pages/map/map';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private storage:Storage,
    private firebase:FCM,
    private auth:AuthServiceProvider,
    private localNotifications:LocalNotifications,
    private http:Http,
    private url:UrlProvider) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: 'HomePage' },
      { title: 'Mis Bitacoras', component: 'BitacorasTabsPage' },
      { title: 'Vistos buenos',component:'VbsPage' },
      { title: 'Mis Tareas', component:'TareasPage' },
      { title: 'Agenda', component:'AgendasPage' },
      { title: 'Informes', component:'InformesPage' },
      { title: 'Evaluaciones', component:'EvaluacionesPage'},
      // { title: 'Contratos', component:'' },
      { title: 'Acerca de', component:'AboutPage'}
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) { 
        this.buscarUsuario();
        this.firebase.onNotification()
          .subscribe(data => {
            console.log(data);
            if (!data.wasTapped) {
              let titulo;
              let texto;
              let datos;
              switch (data.tipo) {
                case "incidente":
                  titulo = 'Se ha aceptado un incidente';
                  texto = data.nombre_nivel;
                  datos = { tipo:'incidente',id_bitacora:data.id_bitacora, tipo_accion:data.tipo_accion };
                  break;
                case "tarea":
                  titulo = 'Se te ha asignado una tarea';
                  texto = '';
                  datos = { tipo:'tarea' };
                  break;
                case "derivacion":
                  titulo = 'Se te ha derivado una bitacora';
                  texto = '';
                  datos = { tipo:'derivacion' };
                  break;
                case "pedido_visto_bueno":
                  titulo = 'Se te ha solicitado un visto bueno';
                  texto = '';
                  datos = { tipo:'pedido_visto_bueno'};
                  break;
                case "bitacora_cerrada":
                  titulo = 'Se ha cerrado una bitácora que has derivado';
                  texto = 'Ahora puedes volver a editarla';
                  datos = { tipo:'bitacora_cerrada',id_bitacora:data.id_bitacora };
                  break;
                case "tarea_cerrada":
                  titulo = 'Tarea terminada';
                  texto = 'Un usuario ha terminado una tarea que le has asignado';
                  datos = { tipo:'tarea_cerrada',id_bitacora:data.id_bitacora };
                  break;
                case "agenda_generada":
                  titulo = 'Nueva agenda';
                  texto = 'Se ha agregado un nuevo evento a la agenda';
                  datos = { tipo:'agenda_generada',id_bitacora:data.id_bitacora, tipo_accion:data.tipo_accion };
                  break;
                default:
                case "agenda_revocada":
                  titulo = 'Agenda revocada';
                  texto = 'Se ha revocado una agenda';
                  datos = { tipo:'agenda_revocada',id_bitacora:data.id_bitacora, tipo_accion:data.tipo_accion };
                  break;
              }
              this.localNotifications.schedule({
                title: titulo,
                text: texto,
                data:datos
              });
            }else{
              this.resolveNotification(data);
            }
          });
        this.localNotifications.on('click', notification => {
          let data = JSON.parse(notification.data);
          this.resolveNotification(data);
        });
      } else {
        this.rootPage = 'WelcomePage';
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  resolveNotification(data){
    switch (data.tipo) {
      case "incidente":
        this.http.get(this.url.url + 'api/v1/Bitacora/' + data.id_bitacora)
          .subscribe(bitacora => {
          this.nav.push('BitacoraPage',{
            bitacora:bitacora.json(),
            tipo_accion: data.tipo_accion
          });                   
        });
        break;
      case "tarea":
        this.nav.push('TareasPage');
        break;
      case "derivacion":
        this.nav.push('BitacorasPage');
        break;
      case "pedido_visto_bueno":
        this.nav.push('VbsPage');
        break;
      case "bitacora_cerrada":
        this.http.get(this.url.url + 'api/v1/Bitacora/' + data.id_bitacora)
          .subscribe(bitacora => {
          this.nav.push('BitacoraPage',{
            bitacora:bitacora.json()
          });                   
        });
        break;
      case "tarea_cerrada":
        this.http.get(this.url.url + 'api/v1/Bitacora/' + data.id_bitacora)
          .subscribe(bitacora => {
          this.nav.push('BitacoraPage',{
            bitacora:bitacora.json()
          });                   
        });
        break;
      case "agenda_generada":
        this.http.get(this.url.url + 'api/v1/Bitacora/' + data.id_bitacora)
          .subscribe(bitacora => {
          this.nav.push('BitacoraPage',{
            bitacora:bitacora.json(),
            tipo_accion: data.tipo_accion
          });                   
        });
        break;
      case "agenda_revocada":
        this.http.get(this.url.url + 'api/v1/Bitacora/' + data.id_bitacora)
          .subscribe(bitacora => {
          this.nav.push('BitacoraPage',{
            bitacora:bitacora.json(),
            tipo_accion: data.tipo_accion
          });                   
        });
        break;
      default:
        break;
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  buscarUsuario(){
    this.storage.get('user').then(user => {
      if(user != null){
        this.firebase.onTokenRefresh()
          .subscribe((token: string) => {
            console.log('Token referscado' + token);
            this.auth.actualizarToken(token);            
          });
        this.storage.get('token').then(val => {
          console.log('Token en storage' + val);
          if (val == null) {
            this.firebase.getToken().then(token => {
              console.log('Primer token' + token);
              this.auth.actualizarToken(token);
            });
          }
        });
        this.rootPage = 'HomePage';
      }else{
        this.rootPage = 'WelcomePage';
      }
    });
  }
}
