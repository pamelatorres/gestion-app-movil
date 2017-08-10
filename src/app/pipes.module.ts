import { NgModule } from '@angular/core';
import { TruncatePipe } from '../pipes/truncate/truncate';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';


@NgModule({
  declarations: [
    TruncatePipe,
    SafeHtmlPipe
  ],
  imports: [
  ],
  exports: [
    TruncatePipe,
    SafeHtmlPipe
  ]
})
export class PipesModule { }