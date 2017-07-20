import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendarPage } from './agendar';

@NgModule({
  declarations: [
    AgendarPage,
  ],
  imports: [
    IonicPageModule.forChild(AgendarPage),
  ],
  exports: [
    AgendarPage
  ]
})
export class AgendarPageModule {}
