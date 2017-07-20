import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DerivarresPage } from './derivarres';

@NgModule({
  declarations: [
    DerivarresPage,
  ],
  imports: [
    IonicPageModule.forChild(DerivarresPage),
  ],
  exports: [
    DerivarresPage
  ]
})
export class DerivarresPageModule {}
