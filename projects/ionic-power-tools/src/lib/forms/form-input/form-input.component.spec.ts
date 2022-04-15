import { Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DefaultAngularValidationMessages } from './angular-validation-messages.interface';

import { FormInputComponent } from './form-input.component';

describe('FormInputComponent', () => {
  let injectorSpy: jasmine.SpyObj<Injector>;
  let testControl: FormControl;
  let component: FormInputComponent;

  beforeEach(() => {
    testControl = new FormControl();
    injectorSpy = jasmine.createSpyObj<Injector>('injectorSpy', ['get']);
    injectorSpy.get.and.returnValue({control: testControl});

    component = new FormInputComponent(DefaultAngularValidationMessages);
    component.label = 'Test'
    component.inputControl = { injector: injectorSpy };
  });

  it('console error if no marked content found', () => {
    component.inputControl = undefined;
    const consoleSpy = spyOn(console, 'error');

    component.ngAfterContentInit();
    expect(consoleSpy).toHaveBeenCalledWith('Could not find form control for input', 'Test')
  });

  it('console error if no form control', () => {
    injectorSpy.get.and.returnValue(null);
    const consoleSpy = spyOn(console, 'error');

    component.ngAfterContentInit();
    expect(consoleSpy).toHaveBeenCalledWith('Could not find form control for input', 'Test')
  });

  it('required flag set when required validator present', () => {
    testControl.addValidators(Validators.required);
    component.ngAfterContentInit();

    expect(component.required).toBeTrue();
  });

  // Exemplar error type to check processing
  describe('error string generation', () => {
    it('minLength validator uses min/max values from error object', () => {
      testControl.addValidators(Validators.minLength(10));
      testControl.setValue('Hi');

      component.ngAfterContentInit();

      expect(component.errors).toEqual(['Test must be at least 10 characters long but is only 2']);
    });
  
    it('custom error uses error body directly', () => {
      testControl.addValidators((control) => ({custom: 'Custom Error'}));
      testControl.updateValueAndValidity();

      component.ngAfterContentInit();

      expect(component.errors).toEqual(['Custom Error']);
    });
  
    it('errors cleared when control becomes valid', () => {
      testControl.addValidators(Validators.required);
      testControl.updateValueAndValidity();

      component.ngAfterContentInit();

      expect(component.errors).toEqual(['Test is required']);
      testControl.setValue('Valid');
      expect(component.errors).toEqual([]);
    });
  });

  afterEach(() => {
    component.ngOnDestroy();
  });
});
