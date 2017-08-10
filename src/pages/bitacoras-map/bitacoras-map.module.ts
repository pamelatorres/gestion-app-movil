import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacorasMapPage } from './bitacoras-map';

@NgModule({
  declarations: [
    BitacorasMapPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacorasMapPage),
  ],
  exports: [
    BitacorasMapPage
  ]
})
export class BitacorasMapPageModule {}
