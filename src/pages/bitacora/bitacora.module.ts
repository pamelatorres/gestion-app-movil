import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacoraPage } from './bitacora';
import { PipesModule } from '../../app/pipes.module';
import { MaterialIconsModule } from 'ionic2-material-icons';


@NgModule({
  declarations: [
    BitacoraPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacoraPage),
    PipesModule,
    MaterialIconsModule
  ],
  exports: [
    BitacoraPage
  ]
})
export class BitacoraPageModule {}
