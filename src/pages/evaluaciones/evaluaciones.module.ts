import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluacionesPage } from './evaluaciones';
import { MaterialIconsModule } from 'ionic2-material-icons';

@NgModule({
  declarations: [
    EvaluacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(EvaluacionesPage),
    MaterialIconsModule
  ],
  exports: [
    EvaluacionesPage
  ]
})
export class EvaluacionesPageModule {}
