import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { EmojiPickerModule } from 'ng-emoji-picker';

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    EmojiPickerModule
  ],
  exports: [
    HomePage
  ]
})
export class HomePageModule {}
