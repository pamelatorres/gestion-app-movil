import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
    private localNotifications:LocalNotifications) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: 'HomePage' },
      { title: 'Mis Bitacoras', component: 'BitacorasTabsPage' },
      { title: 'Mis Tareas', component:'TareasPage' },
      { title: 'Informes', component:'InformesPage' },
      { title: 'Evaluaciones', component:'EvaluacionesPage'},
      { title: 'Agendamientos', component:'AgendasPage' }
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
            if(!data.wasTapped){
              let titulo;
              let texto;
              let datos;
              switch (data.tipo) {
                case "incidente":
                  let usuario = JSON.parse(data.usuario);
                  titulo = 'Se ha aceptado un incidente';
                  texto = usuario.nombre;
                  datos = { tipo:'incidente' };
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
                  datos = { tipo:'pedido_visto_bueno', vb: data.vb, vbid: data.vbid };
                  break;
                case "bitacora_cerrada":
                  titulo = 'Se ha cerrado una bitácora que has derivado';
                  texto = 'Ahora puedes volver a editarla';
                  datos = { tipo:'bitacora_cerrada' };
                  break;
                default:
                  break;
              }
              this.localNotifications.schedule({
                title: titulo,
                text: texto,
                data:datos
              });
            }
          });
        this.localNotifications.on('click', notification => {
          console.log(notification);
          let data = JSON.parse(notification.data);
          console.log(data); 
          switch (data.tipo) {
            case "incidente":
              this.nav.push('BitacorasPage');   
              break;
            case "tarea":
              this.nav.push('TareasPage');
              break;
            case "derivacion":
              this.nav.push('BitacorasPage');
              break;
            case "pedido_visto_bueno":
              this.nav.push('CerrarVbPage',{
                data: data
              });
              break;
            case "":
              this.nav.push('BitacorasPage');
              break;
            default:
              break;
          }
        });
      } else {
        this.rootPage = 'WelcomePage';
      }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
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
