import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { HomeComponent } from './home/home.component';
import { IonicModule } from '@ionic/angular';
import { DialogComponent } from './dialog/dialog.component';
import { NameDialogComponent } from './dialog/name-dialog/name-dialog.component';
import { DynamicDialogModule, PowerToolsFormsModule, DynamicRouterModule } from 'ionic-power-tools';
import { ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    DialogComponent,
    NameDialogComponent,
    FormInputComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    DynamicDialogModule.forRoot(),
    PowerToolsFormsModule.forRoot(),
    DynamicRouterModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
