import { ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { DynamicRouter } from '../services/dynamic-router.service';
import { DynamicRouterLinkDirective } from './dynamic-router-link.directive';

enum TestTargets {
    Test
}

describe('RouterLinkDirective', () => {
    let dynamicRouterSpy: jasmine.SpyObj<DynamicRouter<TestTargets>>;
    let directive: DynamicRouterLinkDirective<TestTargets>;

    beforeEach(() => {
        dynamicRouterSpy = jasmine.createSpyObj<DynamicRouter<TestTargets>>('dynamicRouterSpy', ['generateLinkTo']);
        const routerSpy = jasmine.createSpyObj<Router>('', ['createUrlTree', 'serializeUrl'], {
            events: EMPTY
        });
        routerSpy.serializeUrl.and.returnValue('/test');
        const routeSpy = jasmine.createSpyObj<ActivatedRoute>('', ['toString']);
        const rendererSpy = jasmine.createSpyObj<Renderer2>('', ['createElement', 'setAttribute']);
        const elementSpy = { nativeElement: null };

        directive = new DynamicRouterLinkDirective(dynamicRouterSpy, routerSpy, routeSpy, undefined, rendererSpy, elementSpy);
    })

    it('sets router link to generated url', () => {
        dynamicRouterSpy.generateLinkTo.and.returnValue('/test');
        directive.ngOnChanges({
          iptDynamicRouterLink: {
            isFirstChange: () => true,
            firstChange: true,
            previousValue: null,
            currentValue: TestTargets.Test
          }
        });

        // Private member of base class, have to index :(
        expect(directive['commands']).toEqual(['/test']);
    });
});
