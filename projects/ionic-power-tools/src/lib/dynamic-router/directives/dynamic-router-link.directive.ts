import { Attribute, Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DynamicRouterService } from '../services/dynamic-router.service';

@Directive({
  selector: ':not(a):not(area)[iptDynamicRouterLink]'
})
export class DynamicRouterLinkDirective<TNavTargets> extends RouterLink {
  @Input() public iptDynamicRouterLink: TNavTargets | undefined;
  
  constructor(private readonly dynamicRouter: DynamicRouterService<TNavTargets>,
    router: Router, route: ActivatedRoute,
    @Attribute('tabindex') tabIndexAttribute: string|null|undefined,
    renderer: Renderer2, el: ElementRef) {
    super(router, route, tabIndexAttribute, renderer, el);
  }

  override ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes['iptDynamicRouterLink']) {
      const url = this.dynamicRouter.generateLinkTo(changes['iptDynamicRouterLink'].currentValue);
      this.routerLink = url;
    }
  }
}
