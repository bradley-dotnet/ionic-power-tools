import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicRouterRoutingModule } from './dynamic-router-routing.module';
import { DynamicRouterComponent } from './dynamic-router.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [
    DynamicRouterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    DynamicRouterRoutingModule
  ]
})
export class DynamicRouterModule { }
