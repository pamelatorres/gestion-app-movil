import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IncidentesPage } from './incidentes';

@NgModule({
  declarations: [
    IncidentesPage,
  ],
  imports: [
    IonicPageModule.forChild(IncidentesPage),
  ],
  exports: [
    IncidentesPage
  ]
})
export class IncidentesPageModule {}
