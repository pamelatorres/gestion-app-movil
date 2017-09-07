import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacorasDerivadasCerradasPage } from './bitacoras-derivadas-cerradas';

@NgModule({
  declarations: [
    BitacorasDerivadasCerradasPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacorasDerivadasCerradasPage),
  ],
  exports: [
    BitacorasDerivadasCerradasPage
  ]
})
export class BitacorasDerivadasCerradasPageModule {}
