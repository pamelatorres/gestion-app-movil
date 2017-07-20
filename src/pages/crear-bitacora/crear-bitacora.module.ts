import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearBitacoraPage } from './crear-bitacora';

@NgModule({
  declarations: [
    CrearBitacoraPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearBitacoraPage),
  ],
  exports: [
    CrearBitacoraPage
  ]
})
export class CrearBitacoraPageModule {}
