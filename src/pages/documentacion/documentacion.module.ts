import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentacionPage } from './documentacion';
import { MomentModule } from 'angular2-moment';


@NgModule({
  declarations: [
    DocumentacionPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentacionPage),
    MomentModule
  ],
  exports: [
    DocumentacionPage
  ]
})
export class DocumentacionPageModule {}
