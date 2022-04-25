import { LazyChildren } from 'ionic-power-tools';
import { NavigationTargets } from '../navigation-targets.enum';

export enum DynamicRouterComponents {
    Demo
  }
  

export const dynamicRouterRoutes: LazyChildren<NavigationTargets, DynamicRouterComponents>[] = [
  {
    path: '',
    component: DynamicRouterComponents.Demo,
    navigationTarget: NavigationTargets.DynamicRouter
  }
];
  