import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BitacorasListPage } from './bitacoras-list';

@NgModule({
  declarations: [
    BitacorasListPage,
  ],
  imports: [
    IonicPageModule.forChild(BitacorasListPage),
  ],
  exports: [
    BitacorasListPage
  ]
})
export class BitacorasListPageModule {}
