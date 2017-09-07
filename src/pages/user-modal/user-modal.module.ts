import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserModalPage } from './user-modal';

@NgModule({
  declarations: [
    UserModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UserModalPage),
  ],
  exports: [
    UserModalPage
  ]
})
export class UserModalPageModule {}
