
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[autocompleteOff]'
})
export class AutocompleteOffDirective {
  constructor(private _el: ElementRef) {
    let w: any = window;
    let isChrome = w.chrome;
    if (isChrome) {
      this._el.nativeElement.setAttribute('autocomplete', 'off');
      this._el.nativeElement.setAttribute('autocorrect', 'off');
      this._el.nativeElement.setAttribute('autocapitalize', 'none');
      this._el.nativeElement.setAttribute('spellcheck', 'false');
    }
  }
}