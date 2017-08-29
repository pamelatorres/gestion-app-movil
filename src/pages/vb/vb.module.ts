import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VbPage } from './vb';
import { PipesModule } from '../../app/pipes.module';


@NgModule({
  declarations: [
    VbPage,
  ],
  imports: [
    IonicPageModule.forChild(VbPage),
    PipesModule
  ],
  exports: [
    VbPage
  ]
})
export class VbPageModule {}
