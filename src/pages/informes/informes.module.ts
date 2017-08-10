import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformesPage } from './informes';

@NgModule({
  declarations: [
    InformesPage,
  ],
  imports: [
    IonicPageModule.forChild(InformesPage),
  ],
  exports: [
    InformesPage
  ]
})
export class InformesPageModule {}
