import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { FormInputComponent } from './form-input/form-input.component';
import { HomeComponent } from './home/home.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'loading-spinner',
    component: LoadingSpinnerComponent
  },
  {
    path: 'dynamic-dialog',
    component: DialogComponent
  },
  {
    path: 'form-input',
    component: FormInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
