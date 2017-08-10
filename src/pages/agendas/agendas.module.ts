import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendasPage } from './agendas';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    AgendasPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(AgendasPage),
  ],
  exports: [
    AgendasPage
  ]
})
export class AgendasPageModule {}
