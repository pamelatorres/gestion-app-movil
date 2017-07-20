import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacoraPage } from './bitacora';
import { PipesModule } from '../../app/pipes.module';


@NgModule({
  declarations: [
    BitacoraPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacoraPage),
    PipesModule
  ],
  exports: [
    BitacoraPage
  ]
})
export class BitacoraPageModule {}
