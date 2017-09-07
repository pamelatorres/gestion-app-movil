import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VbsPage } from './vbs';

@NgModule({
  declarations: [
    VbsPage,
  ],
  imports: [
    IonicPageModule.forChild(VbsPage),
  ],
  exports: [
    VbsPage
  ]
})
export class VbsPageModule {}
