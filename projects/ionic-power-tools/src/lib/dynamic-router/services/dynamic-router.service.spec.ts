import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { DynamicRoute } from '../dynamic-route.model';
import { DynamicRouter } from './dynamic-router.service';
import { RouteTreeTraverserService } from './route-tree-traverser.service';

enum TestTargets {
  Test,
  NonExistent
}

describe('DynamicRouterService', () => {
  const currentRoute = {
    routeConfig: {
      children: []
    }
  } as unknown as ActivatedRouteSnapshot;
  let treeTraverserSpy: jasmine.SpyObj<RouteTreeTraverserService<TestTargets>>;
  let routerSpy: jasmine.SpyObj<Router>;
  let service: DynamicRouter<TestTargets>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('routerSpy', ['navigate']);
    treeTraverserSpy = jasmine.createSpyObj<RouteTreeTraverserService<TestTargets>>('traverserSpy', ['mapTargets']);

    treeTraverserSpy.mapTargets.and.returnValue(new Map([
      [TestTargets.Test, ['test', ':id']]
    ]));

    service = new DynamicRouter(routerSpy, treeTraverserSpy);
  });

  describe('navigateTo', () => {
    it('navigates with proper parameters', () => {
      const extras = { replaceUrl: true };
      service.navigateTo(TestTargets.Test, { id: 1 }, extras);

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/', 'test', '1'], extras);
    });

    it('throws when route parameter missing', () => {
      expect(() => service.navigateTo(TestTargets.Test)).toThrowError('Required route parameter id was not found in route params object');
    });

    it('throws when non-existing target passed', () => {
      expect(() => service.navigateTo(TestTargets.NonExistent)).toThrowError('Could not find navigation target 1 anywhere in route config');
    });
  });

  describe('generateLinkTo', () => {
    it('generates link with proper parameters', () => {
      const link = service.generateLinkTo(TestTargets.Test, { id: 2 });
      expect(link).toBe('/test/2');
    });

    it('throws when route parameter missing', () => {
      expect(() => service.generateLinkTo(TestTargets.Test, { name: 'bob' })).toThrowError('Required route parameter id was not found in route params object');
    });

    it('throws when non-existing target passed', () => {
      expect(() => service.generateLinkTo(TestTargets.NonExistent)).toThrowError('Could not find navigation target 1 anywhere in route config');
    });
  });

  describe('navigateRelativeTo', () => {
    beforeEach(() => {
      treeTraverserSpy.mapTargets.calls.reset();
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.Test, ['relative', ':name']]
      ]));
    });

    it('navigates with proper parameters', () => {
      const extras = { replaceUrl: true };
      service.navigateRealtiveTo(TestTargets.Test, currentRoute, { name: 'bob' }, extras);

      const children: DynamicRoute<TestTargets>[] = currentRoute!.routeConfig!.children as DynamicRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['./', 'relative', 'bob'], extras);
    });

    it('throws when route parameter missing', () => {
      expect(() => service.navigateRealtiveTo(TestTargets.Test, currentRoute, { id: 1 }))
        .toThrowError('Required route parameter name was not found in route params object');

      const children: DynamicRoute<TestTargets>[] = currentRoute!.routeConfig!.children as DynamicRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });

    it('throws when non-existing target passed', () => {
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.NonExistent, ['relative', ':name']]
      ]));
      expect(() => service.navigateRealtiveTo(TestTargets.Test, currentRoute))
        .toThrowError('Could not find navigation target 0 anywhere in route config');

      const children: DynamicRoute<TestTargets>[] = currentRoute!.routeConfig!.children as DynamicRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });
  });

  describe('generateLinkRelativeTo', () => {
    beforeEach(() => {
      treeTraverserSpy.mapTargets.calls.reset();
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.Test, ['relative', ':name']]
      ]));
    });

    it('generates link with proper parameters', () => {
      const link = service.generateLinkRelativeTo(TestTargets.Test, currentRoute, { name: 'bob' });

      const children: DynamicRoute<TestTargets>[] = currentRoute!.routeConfig!.children as DynamicRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
      expect(link).toEqual('./relative/bob');
    });

    it('throws when route parameter missing', () => {
      expect(() => service.generateLinkRelativeTo(TestTargets.Test, currentRoute, { id: 1 }))
        .toThrowError('Required route parameter name was not found in route params object');

      const children: DynamicRoute<TestTargets>[] = currentRoute!.routeConfig!.children as DynamicRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });

    it('throws when non-existing target passed', () => {
      treeTraverserSpy.mapTargets.and.returnValue(new Map([
        [TestTargets.NonExistent, ['relative', ':name']]
      ]));
      expect(() => service.generateLinkRelativeTo(TestTargets.Test, currentRoute))
        .toThrowError('Could not find navigation target 0 anywhere in route config');

      const children: DynamicRoute<TestTargets>[] = currentRoute!.routeConfig!.children as DynamicRoute<TestTargets>[];
      expect(treeTraverserSpy.mapTargets).toHaveBeenCalledWith(children);
    });
  });
});
