import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacoraMapaPage } from './bitacora-mapa';

@NgModule({
  declarations: [
    BitacoraMapaPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacoraMapaPage),
  ],
  exports: [
    BitacoraMapaPage
  ]
})
export class BitacoraMapaPageModule {}
