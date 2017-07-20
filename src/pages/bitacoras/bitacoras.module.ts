import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacorasPage } from './bitacoras';

@NgModule({
  declarations: [
    BitacorasPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacorasPage),
  ],
  exports: [
    BitacorasPage
  ]
})
export class BitacorasPageModule {}
