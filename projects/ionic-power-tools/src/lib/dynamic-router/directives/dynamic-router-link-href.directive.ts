import { LocationStrategy } from '@angular/common';
import { Directive, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkWithHref } from '@angular/router';
import { DynamicRouterService } from '../services/dynamic-router.service';

@Directive({
  selector: 'a[iotDynamicRouterLink],area[iotDynamicRouterLink]'
})
export class DynamicRouterLinkHrefDirective<TNavTargets> extends RouterLinkWithHref {
  @Input() public iotDynamicRouterLink: TNavTargets | undefined;

  constructor(private readonly dynamicRouter: DynamicRouterService<TNavTargets>,
    router: Router, route: ActivatedRoute,
    locationStrategy: LocationStrategy) {
      super(router, route, locationStrategy);
  }

  override ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);
    if (changes['iotDynamicRouterLink']) {
      const url = this.dynamicRouter.generateLinkTo(changes['iotDynamicRouterLink'].currentValue);
      this.routerLink = url;
    }
  }
}
