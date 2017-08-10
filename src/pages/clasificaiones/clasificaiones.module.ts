import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClasificaionesPage } from './clasificaiones';

@NgModule({
  declarations: [
    ClasificaionesPage,
  ],
  imports: [
    IonicPageModule.forChild(ClasificaionesPage),
  ],
  exports: [
    ClasificaionesPage
  ]
})
export class ClasificaionesPageModule {}
