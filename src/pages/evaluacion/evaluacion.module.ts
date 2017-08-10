import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvaluacionPage } from './evaluacion';
import { Ionic2RatingModule } from 'ionic2-rating';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';


@NgModule({
  declarations: [
    EvaluacionPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(EvaluacionPage),
    Ionic2RatingModule,
  ],
  exports: [
    EvaluacionPage
  ]
})
export class EvaluacionPageModule {}
