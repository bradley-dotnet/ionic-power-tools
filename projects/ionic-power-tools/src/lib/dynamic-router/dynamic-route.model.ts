import { LoadChildren, Route } from "@angular/router";

export interface EagerRoute<TNavTargets> extends Omit<Route, 'loadChildren'> {
    loadChildren?: never;
    children?: EagerRoute<TNavTargets>[],
    navigationTarget?: TNavTargets;
}

export interface LazyRoute<TNavTargets, TComponent extends number> extends Omit<Route, 'component' | 'children' | 'loadChildren'> {
    loadChildren: LoadChildren;
    childRouteConfigs: (LazyChildren<TNavTargets, TComponent> | LazyRoute<TNavTargets, number>)[];
}

export interface LazyChildren<TNavTargets, TComponent extends number> extends Omit<EagerRoute<TNavTargets>, 'component' | 'children'> {
    component?: TComponent;
    children?: LazyChildren<TNavTargets, TComponent>[];
}

export type DynamicRoute<TNavTargets> = EagerRoute<TNavTargets> | LazyRoute<TNavTargets, number>;
