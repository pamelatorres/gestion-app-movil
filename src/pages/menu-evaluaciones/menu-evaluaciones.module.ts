import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuEvaluacionesPage } from './menu-evaluaciones';

@NgModule({
  declarations: [
    MenuEvaluacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuEvaluacionesPage),
  ],
  exports: [
    MenuEvaluacionesPage
  ]
})
export class MenuEvaluacionesPageModule {}
