import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicRouterService } from './services/dynamic-router.service';
import { RouteTreeTraverserService } from './services/route-tree-traverser.service';
import { DynamicRouterLinkDirective } from './directives/dynamic-router-link.directive';
import { DynamicRouterLinkHrefDirective } from './directives/dynamic-router-link-href.directive';



@NgModule({
  declarations: [
    DynamicRouterLinkDirective,
    DynamicRouterLinkHrefDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DynamicRouterLinkDirective,
    DynamicRouterLinkHrefDirective
  ]
})
export class DynamicRouterModule {
  static forRoot(): ModuleWithProviders<DynamicRouterModule> {
    return {
      ngModule: DynamicRouterModule,
      providers: [
        DynamicRouterService,
        RouteTreeTraverserService
      ]
    };
  }
}
