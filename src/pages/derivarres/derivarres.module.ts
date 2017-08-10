import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PipesModule } from '../../app/pipes.module';
import { DerivarresPage } from './derivarres';

@NgModule({
  declarations: [
    DerivarresPage,
  ],
  imports: [
    IonicPageModule.forChild(DerivarresPage),
    PipesModule
  ],
  exports: [
    DerivarresPage
  ]
})
export class DerivarresPageModule {}
