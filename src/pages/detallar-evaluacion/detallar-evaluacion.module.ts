import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallarEvaluacionPage } from './detallar-evaluacion';

@NgModule({
  declarations: [
    DetallarEvaluacionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallarEvaluacionPage),
  ],
  exports: [
    DetallarEvaluacionPage
  ]
})
export class DetallarEvaluacionPageModule {}
