import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';


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
    private storage:Storage) {

    storage.get('user').then(val => {
      console.log(val);
      if(val != null){
        /*this.firebase.onTokenRefresh()
          .subscribe((token: string) => {
            this.auth.actualizarToken({
              id_usuario: val.id_usuario,
              token: token
            });            
          });*/
        storage.get('token').then(val => {
          if (val == null) {
            /*this.firebase.getToken().then(token => {
              let data = {
                id_usuario: val.id_usuario,
                token: token
              };
              this.auth.actualizarToken(data);
            });*/
          }
        });
        this.rootPage = 'HomePage';
      }else{
        this.rootPage = 'WelcomePage';
      }
      this.initializeApp();
    });
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' },
      { title: 'Mis incidentes', component: 'IncidentesPage' },
      { title: 'Crear bitacora', component: 'BitacoraPage' },
      { title: 'Mis Bitacoras', component: 'BitacorasPage' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
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
}
