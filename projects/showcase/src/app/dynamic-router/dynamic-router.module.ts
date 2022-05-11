import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicRouterRoutingModule } from './dynamic-router-routing.module';
import { DynamicRouterComponent } from './dynamic-router.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DynamicRouterComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicRouterRoutingModule
  ]
})
export class DynamicRouterModule { }
