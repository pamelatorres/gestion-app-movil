import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Firebase } from '@ionic-native/firebase';
import { Storage } from '@ionic/storage';


/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading:Loading;
  registerCredentials = { email: '', password: '' };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingCtrl:LoadingController,
    private auth:AuthServiceProvider,
    private alertCtrl:AlertController,
    private firebase: Firebase,
    private storage:Storage) {
  }

  ionViewDidLoad() {

  }
  public login(){
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) { 
        this.storage.get('user').then(data => {
          this.firebase.getToken()
            .then(token => this.auth.actualizarToken(token))
            .catch(error => console.error('Error getting token', error));
          this.navCtrl.setRoot('HomePage');    
        });
      } else {
        this.showError("Credenciales incorrectas");
      }
    }, error => {
      this.showError(error);
    });
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Por favor espere ....',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['Aceptar']
    });
    alert.present(prompt);
  }
}
