import { LocationStrategy } from '@angular/common';
import { Directive, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { DynamicRouter } from '../services/dynamic-router.service';

@Directive({
  selector: 'a[iptDynamicRouterLink],area[iptDynamicRouterLink]'
})
export class DynamicRouterLinkHrefDirective<TNavTargets> extends RouterLinkWithHref {
  @Input() public iptDynamicRouterLink: TNavTargets | undefined;

  constructor(private readonly dynamicRouter: DynamicRouter<TNavTargets>,
    router: Router, route: ActivatedRoute,
    locationStrategy: LocationStrategy) {
      super(router, route, locationStrategy);
  }

  override ngOnChanges(changes: SimpleChanges) {
    if (changes['iptDynamicRouterLink']) {
      const url = this.dynamicRouter.generateLinkTo(changes['iptDynamicRouterLink'].currentValue);
      this.routerLink = url;
    }
    super.ngOnChanges(changes);
  }
}
