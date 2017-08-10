import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TareasPage } from './tareas';
import { PipesModule } from '../../app/pipes.module';


@NgModule({
  declarations: [
    TareasPage,
  ],
  imports: [
    IonicPageModule.forChild(TareasPage),
    PipesModule
  ],
  exports: [
    TareasPage
  ]
})
export class TareasPageModule {}
