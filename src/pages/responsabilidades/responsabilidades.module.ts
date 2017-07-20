import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResponsabilidadesPage } from './responsabilidades';

@NgModule({
  declarations: [
    ResponsabilidadesPage,
  ],
  imports: [
    IonicPageModule.forChild(ResponsabilidadesPage),
  ],
  exports: [
    ResponsabilidadesPage
  ]
})
export class ResponsabilidadesPageModule {}
