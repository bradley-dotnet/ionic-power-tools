import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form-input/form-input.component';
import { InputElementDirective } from './form-input/input-element.directive';
import { IonicModule } from '@ionic/angular';
import { AngularValidationMessages, ANGULAR_VALIDATION_ERRORS, DefaultAngularValidationMessages } from './form-input/angular-validation-messages.interface';

@NgModule({
  declarations: [
    FormInputComponent,
    InputElementDirective
  ],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class FormsModule {
  static forRoot(builtInErrorMessages?: AngularValidationMessages): ModuleWithProviders<FormsModule> {
    return {
      ngModule: FormsModule,
      providers: [
        { provide: ANGULAR_VALIDATION_ERRORS, useValue: builtInErrorMessages || DefaultAngularValidationMessages }
      ]
    };
  }
}
