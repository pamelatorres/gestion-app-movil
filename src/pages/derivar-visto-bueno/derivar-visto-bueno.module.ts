import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DerivarVistoBuenoPage } from './derivar-visto-bueno';
import { PipesModule } from '../../app/pipes.module';


@NgModule({
  declarations: [
    DerivarVistoBuenoPage,
  ],
  imports: [
    IonicPageModule.forChild(DerivarVistoBuenoPage),
    PipesModule
  ],
  exports: [
    DerivarVistoBuenoPage
  ]
})
export class DerivarVistoBuenoPageModule {}
