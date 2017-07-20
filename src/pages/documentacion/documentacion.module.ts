import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DocumentacionPage } from './documentacion';

@NgModule({
  declarations: [
    DocumentacionPage,
  ],
  imports: [
    IonicPageModule.forChild(DocumentacionPage),
  ],
  exports: [
    DocumentacionPage
  ]
})
export class DocumentacionPageModule {}
