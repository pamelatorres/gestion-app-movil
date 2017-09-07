import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CerrarTareaPage } from './cerrar-tarea';

@NgModule({
  declarations: [
    CerrarTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(CerrarTareaPage),
  ],
  exports: [
    CerrarTareaPage
  ]
})
export class CerrarTareaPageModule {}
