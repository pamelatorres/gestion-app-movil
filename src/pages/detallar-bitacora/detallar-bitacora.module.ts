import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallarBitacoraPage } from './detallar-bitacora';

@NgModule({
  declarations: [
    DetallarBitacoraPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallarBitacoraPage),
  ],
  exports: [
    DetallarBitacoraPage
  ]
})
export class DetallarBitacoraPageModule {}
