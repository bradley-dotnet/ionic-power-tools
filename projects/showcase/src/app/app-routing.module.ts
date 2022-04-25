import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DynamicRoute } from 'ionic-power-tools';
import { DialogComponent } from './dialog/dialog.component';
import { dynamicRouterRoutes } from './dynamic-router/dynamic-router.routes';
import { FormInputComponent } from './form-input/form-input.component';
import { HomeComponent } from './home/home.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavigationTargets } from './navigation-targets.enum';

const routes: DynamicRoute<NavigationTargets>[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    navigationTarget: NavigationTargets.Home
  },
  {
    path: 'loading-spinner',
    component: LoadingSpinnerComponent,
    navigationTarget: NavigationTargets.LoadingSpinner
  },
  {
    path: 'dynamic-dialog',
    component: DialogComponent,
    navigationTarget: NavigationTargets.Dialog
  },
  {
    path: 'form-input',
    component: FormInputComponent,
    navigationTarget: NavigationTargets.FormInput,
  },
  {
    path: 'dyanmic-router',
    loadChildren: () => import('./dynamic-router/dynamic-router.module').then(m => m.DynamicRouterModule),
    childRouteConfigs: dynamicRouterRoutes,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
