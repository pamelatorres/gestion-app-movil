import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuTareasPage } from './menu-tareas';

@NgModule({
  declarations: [
    MenuTareasPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuTareasPage),
  ],
  exports: [
    MenuTareasPage
  ]
})
export class MenuTareasPageModule {}
