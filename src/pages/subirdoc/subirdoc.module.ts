import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubirdocPage } from './subirdoc';

@NgModule({
  declarations: [
    SubirdocPage,
  ],
  imports: [
    IonicPageModule.forChild(SubirdocPage),
  ],
  exports: [
    SubirdocPage
  ]
})
export class SubirdocPageModule {}
