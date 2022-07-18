import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'safe'
})
export class SafePipe implements PipeTransform {

  constructor(  protected _Sanitizer: DomSanitizer) {}

  transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch(type) {
      case 'html' : return this._Sanitizer.bypassSecurityTrustHtml(value);
      case 'style' : return this._Sanitizer.bypassSecurityTrustStyle(value);
      case 'script' : return this._Sanitizer.bypassSecurityTrustScript(value);
      case 'url' : return this._Sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl' : return this._Sanitizer.bypassSecurityTrustResourceUrl(value);
      default: throw new Error(`El tipo especificado en inválido ${type}`);
    }
  }

}