import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { ClasificacionProvider } from '../providers/clasificacion/clasificacion';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { UrlProvider } from '../providers/url/url';
import { FileChooser } from '@ionic-native/file-chooser';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { CalendarModule } from 'angular-calendar';
import { MaterialIconsModule } from 'ionic2-material-icons';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { IonicStorageModule } from '@ionic/storage';
import { LOCALE_ID } from '@angular/core';
import { DatePicker } from '@ionic-native/date-picker';
import { Firebase } from '@ionic-native/firebase';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp,{
      monthNames:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Novirembre','Diciembre'],
      monthShortNames:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
    }),
    CalendarModule.forRoot(),
    MaterialIconsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    File,
    Transfer,
    Camera,
    FilePath,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: "es-ES"},
    UrlProvider,
    FileChooser,
    MediaCapture,
    AuthServiceProvider,
    DatePicker,
    Firebase
  ]
})
export class AppModule {}
