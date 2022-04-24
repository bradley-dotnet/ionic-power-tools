import { MockLocationStrategy } from '@angular/common/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { DynamicRouter } from '../services/dynamic-router.service';
import { DynamicRouterLinkHrefDirective } from './dynamic-router-link-href.directive';

enum TestTargets {
  Test
}

describe('DynamicRouterLinkHrefDirective', () => {
  let dynamicRouterSpy: jasmine.SpyObj<DynamicRouter<TestTargets>>;
  let directive: DynamicRouterLinkHrefDirective<TestTargets>;

  beforeEach(() => {
    dynamicRouterSpy = jasmine.createSpyObj<DynamicRouter<TestTargets>>('dynamicRouterSpy', ['generateLinkTo']);
    const routerSpy = jasmine.createSpyObj<Router>('', ['createUrlTree', 'serializeUrl'], {
      events: EMPTY
    });
    routerSpy.serializeUrl.and.returnValue('/test');
    const routeSpy = jasmine.createSpyObj<ActivatedRoute>('', ['toString']);
    const locationStrategySpy = new MockLocationStrategy()

    directive = new DynamicRouterLinkHrefDirective(dynamicRouterSpy, routerSpy, routeSpy, locationStrategySpy);
  });

  it('sets href to generated link', () => {
    dynamicRouterSpy.generateLinkTo.and.returnValue('/test');
    directive.ngOnChanges({
      iptDynamicRouterLink: {
        isFirstChange: () => true,
        firstChange: true,
        previousValue: null,
        currentValue: TestTargets.Test
      }
    });
    expect(directive.href).toBe('/test');
  });
});
