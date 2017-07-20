import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VbPage } from './vb';

@NgModule({
  declarations: [
    VbPage,
  ],
  imports: [
    IonicPageModule.forChild(VbPage),
  ],
  exports: [
    VbPage
  ]
})
export class VbPageModule {}
