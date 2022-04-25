import { NgModule, Type } from '@angular/core';
import { RouterModule } from '@angular/router';
import { populateComponents } from 'ionic-power-tools';
import { DynamicRouterComponent } from './dynamic-router.component';
import { DynamicRouterComponents, dynamicRouterRoutes } from './dynamic-router.routes';


const componentMap: Record<DynamicRouterComponents, Type<any>> = {
  [DynamicRouterComponents.Demo]: DynamicRouterComponent
}


@NgModule({
  imports: [RouterModule.forChild(populateComponents(componentMap, dynamicRouterRoutes))],
  exports: [RouterModule]
})
export class DynamicRouterRoutingModule { }
