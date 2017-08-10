import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgendaPage } from './agenda';
import { NgCalendarModule } from 'ionic2-calendar';

@NgModule({
  declarations: [
    AgendaPage,
  ],
  imports: [
    NgCalendarModule,
    IonicPageModule.forChild(AgendaPage),
  ],
  exports: [
    AgendaPage
  ]
})
export class AgendaPageModule {}
