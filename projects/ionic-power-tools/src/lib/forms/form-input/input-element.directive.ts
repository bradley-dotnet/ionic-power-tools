import { Directive, Injector } from '@angular/core';

@Directive({
  selector: '[iptInputElement]'
})
export class InputElementDirective {

  constructor(public readonly injector: Injector) { }

}
