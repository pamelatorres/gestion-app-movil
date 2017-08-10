import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CrearTareaPage } from './crear-tarea';
import { PipesModule } from '../../app/pipes.module';


@NgModule({
  declarations: [
    CrearTareaPage,
  ],
  imports: [
    IonicPageModule.forChild(CrearTareaPage),
    PipesModule
  ],
  exports: [
    CrearTareaPage
  ]
})
export class CrearTareaPageModule {}
