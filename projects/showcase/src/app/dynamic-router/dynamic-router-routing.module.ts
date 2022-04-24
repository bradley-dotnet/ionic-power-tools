import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LazyChildren, populateComponents } from 'ionic-power-tools';
import { NavigationTargets } from '../navigation-targets.enum';
import { DynamicRouterComponent } from './dynamic-router.component';

enum DynamicRouterComponents {
  Demo
}

const componentMap: Record<DynamicRouterComponents, Type<any>> = {
  [DynamicRouterComponents.Demo]: DynamicRouterComponent
}

export const dynamicRouterRoutes: LazyChildren<NavigationTargets, DynamicRouterComponents>[] = [
  {
    path: '',
    component: DynamicRouterComponents.Demo,
    navigationTarget: NavigationTargets.DynamicRouter
  }
];

@NgModule({
  imports: [RouterModule.forChild(populateComponents(componentMap, dynamicRouterRoutes))],
  exports: [RouterModule]
})
export class DynamicRouterRoutingModule { }
