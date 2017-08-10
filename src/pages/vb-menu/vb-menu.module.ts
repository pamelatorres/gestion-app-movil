import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VbMenuPage } from './vb-menu';

@NgModule({
  declarations: [
    VbMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(VbMenuPage),
  ],
  exports: [
    VbMenuPage
  ]
})
export class VbMenuPageModule {}
