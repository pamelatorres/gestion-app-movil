import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacoraDetalleModalPage } from './bitacora-detalle-modal';

@NgModule({
  declarations: [
    BitacoraDetalleModalPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacoraDetalleModalPage),
  ],
  exports: [
    BitacoraDetalleModalPage
  ]
})
export class BitacoraDetalleModalPageModule {}
