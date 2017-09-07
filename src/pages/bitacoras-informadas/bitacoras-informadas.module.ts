import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacorasInformadasPage } from './bitacoras-informadas';

@NgModule({
  declarations: [
    BitacorasInformadasPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacorasInformadasPage),
  ],
  exports: [
    BitacorasInformadasPage
  ]
})
export class BitacorasInformadasPageModule {}
