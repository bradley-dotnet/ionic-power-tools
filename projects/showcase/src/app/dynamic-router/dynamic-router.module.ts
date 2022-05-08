import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicRouterRoutingModule } from './dynamic-router-routing.module';
import { DynamicRouterComponent } from './dynamic-router.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DynamicRouterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    DynamicRouterRoutingModule
  ]
})
export class DynamicRouterModule { }
