import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  pure: false
})
export class SafeHtmlPipe implements PipeTransform {

  public constructor(private sanitizar: DomSanitizer){

  }

  transform(value: string) {
    return this.sanitizar.bypassSecurityTrustHtml(value);
  }
}
