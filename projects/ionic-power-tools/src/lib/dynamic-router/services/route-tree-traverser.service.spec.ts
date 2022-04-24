import { DynamicRoute } from '../dynamic-route.model';
import { RouteTreeTraverserService } from './route-tree-traverser.service';

enum TestTargets {
  Home,
  Child,
  LazyChild
}

describe('RouteTreeTraverserService', () => {
  let service: RouteTreeTraverserService<TestTargets>;

  beforeEach(() => {
    service = new RouteTreeTraverserService();
  });

  it('should find all targets', () => {
    const routes: DynamicRoute<TestTargets>[] = [
      {
        path: 'home',
        navigationTarget: TestTargets.Home
      },
      {
        path: 'children',
        children: [
          {
            path: 'child',
            navigationTarget: TestTargets.Child
          }
        ]
      },
      {
        path: 'lazy',
        childRouteConfigs: [
          {
            path: '',
            navigationTarget: TestTargets.LazyChild
          }
        ]
      }
    ];
    const targetMap = service.mapTargets(routes);

    expect(targetMap.get(TestTargets.Home)).toEqual(['home']);
    expect(targetMap.get(TestTargets.Child)).toEqual(['children', 'child']);
    expect(targetMap.get(TestTargets.LazyChild)).toEqual(['lazy']);
  });
});
