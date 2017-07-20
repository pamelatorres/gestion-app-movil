import { NgModule } from '@angular/core';
import { TruncatePipe } from '../pipes/truncate/truncate';

@NgModule({
  declarations: [
    TruncatePipe,
  ],
  imports: [

  ],
  exports: [
    TruncatePipe
  ]
})
export class PipesModule { }