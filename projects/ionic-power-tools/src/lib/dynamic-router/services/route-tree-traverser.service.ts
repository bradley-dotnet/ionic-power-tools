import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { DynamicRoute, EagerRoute, LazyRoute } from '../dynamic-route.model';

@Injectable()
export class RouteTreeTraverserService<TNavTargets> {
  public mapTargets(routes: Routes): Map<TNavTargets, string[]> {
    return this.createTargetMap(routes, []);
  }

  private createTargetMap(routes: DynamicRoute<TNavTargets>[], parents: string[]): Map<TNavTargets, string[]> {
    return routes.reduce((targets, route) => {
      const segments = [...parents];
      if (route.path) {
        segments.push(route.path)
      }
      if (this.isEagerRoute(route)) {
        targets.set(route.navigationTarget, segments);
      }
      
      if (this.isLazyRoute(route)) {
        return {
          ...targets,
          ...this.createTargetMap(route.childRouteConfigs, segments)
        }
      } else if (route.children) {
        return {
          ...targets,
          ...this.createTargetMap(route.children, segments)
        }
      } else {
        return targets;
      }
    }, new Map());
  }

  private isEagerRoute(route: DynamicRoute<TNavTargets>): route is EagerRoute<TNavTargets> {
    return (route as EagerRoute<TNavTargets>).navigationTarget !== undefined;
  }

  private isLazyRoute(route: DynamicRoute<TNavTargets>): route is LazyRoute<TNavTargets, number> {
    return (route as LazyRoute<TNavTargets, number>).loadChildren !== undefined;
  }
}
