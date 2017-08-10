import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CerrarVbPage } from './cerrar-vb';

@NgModule({
  declarations: [
    CerrarVbPage,
  ],
  imports: [
    IonicPageModule.forChild(CerrarVbPage),
  ],
  exports: [
    CerrarVbPage
  ]
})
export class CerrarVbPageModule {}
