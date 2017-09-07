import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VerDocsPage } from './ver-docs';

@NgModule({
  declarations: [
    VerDocsPage,
  ],
  imports: [
    IonicPageModule.forChild(VerDocsPage),
  ],
  exports: [
    VerDocsPage
  ]
})
export class VerDocsPageModule {}
