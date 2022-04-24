import { Injectable } from '@angular/core';
import { Routes } from '@angular/router';
import { DynamicRoute, EagerRoute, LazyChildren, LazyRoute } from '../dynamic-route.model';

@Injectable()
export class RouteTreeTraverserService<TNavTargets> {
  public mapTargets(routes: Routes): Map<TNavTargets, string[]> {
    // Cast the routes; we have to assume they are dynamic routes
    return this.createTargetMap(routes as (DynamicRoute<TNavTargets> | LazyChildren<TNavTargets, number>)[], []);
  }

  private createTargetMap(routes: (DynamicRoute<TNavTargets> | LazyChildren<TNavTargets, number>)[], parents: string[]): Map<TNavTargets, string[]> {
    return routes.reduce((targets, route) => {
      const segments = [...parents];
      if (route.path) {
        segments.push(route.path)
      }
      if (this.isEagerRoute(route)) {
        targets.set(route.navigationTarget, segments);
      }
      
      if (this.isLazyRoute(route)) {
        return new Map([
          ...targets.entries(),
          ...this.createTargetMap(route.childRouteConfigs, segments).entries()
        ])
      } else if (route.children) {
        return new Map([
          ...targets.entries(),
          ...this.createTargetMap(route.children, segments).entries()
        ])
      } else {
        return targets;
      }
    }, new Map());
  }

  private isEagerRoute(route: DynamicRoute<TNavTargets> | LazyChildren<TNavTargets, number>): route is EagerRoute<TNavTargets> {
    return (route as EagerRoute<TNavTargets>).navigationTarget !== undefined;
  }

  private isLazyRoute(route: DynamicRoute<TNavTargets> | LazyChildren<TNavTargets, number>): route is LazyRoute<TNavTargets, number> {
    return (route as LazyRoute<TNavTargets, number>).loadChildren !== undefined;
  }
}
