import { AfterContentInit, Component, ContentChild, Inject, Input, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { partition, startWith, Subject, takeUntil } from 'rxjs';
import { AngularValidationMessages, ANGULAR_VALIDATION_ERRORS } from './angular-validation-messages.interface';
import { InputElementDirective } from './input-element.directive';

@Component({
  selector: 'ipt-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements AfterContentInit, OnDestroy {
  @Input() label: string = '';
  @ContentChild(InputElementDirective) public inputControl: InputElementDirective | undefined;

  public required: boolean = false;
  public errors: string[] = [];
  public control: AbstractControl | undefined;
  private destroy$: Subject<null> = new Subject();

  constructor(@Inject(ANGULAR_VALIDATION_ERRORS) private readonly errorMessages: AngularValidationMessages) {
  }

  ngAfterContentInit(): void {
    const childInjector = this.inputControl?.injector;
    const attachedFormControl = childInjector?.get(NgControl, null)?.control;
    if (attachedFormControl) {
      this.control = attachedFormControl;
      this.required = this.controlIsRequired(attachedFormControl)
      const validity$ = partition(attachedFormControl.statusChanges.pipe(
        startWith(attachedFormControl.status)
      ), (status) => status === 'INVALID');

      //Invalid
      validity$[0].subscribe(() => {
        const errors: {[validator: string]: string | object | number} = attachedFormControl.errors!;
        this.errors = Object.getOwnPropertyNames(errors)
          .map((key) => this.generateError(key, errors[key]));
      });
      // Valid
      validity$[1].pipe(
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.errors = []
      });
    } else {
      console.error('Could not find form control for input', this.label);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  private controlIsRequired(control: AbstractControl | null): boolean {
    let validationResult = control?.validator?.(new FormControl(null));
    return validationResult?.['required'];
  }

  private generateError(key: keyof AngularValidationMessages | string, errorBody: string | object | number): string {
    const builtIn: (label: string, body: unknown) => string = 
      // Have to cast to try and index the built-in message generators, then type the body so we can call it
      // The method parameters are guranteed by the AngularValidationMessages map
      // If the end user extends AngularValidationMessages; this path will work the same way
      this.errorMessages[(key as keyof AngularValidationMessages)] as (label: string, body: unknown) => string;
    if (!!builtIn) {
      return builtIn(this.label, errorBody);
    } else {
      // Generally we expect remaining bodies to be strings; but just in case toString so there's something to output
      return typeof errorBody === 'string' ? errorBody : errorBody.toString();
    }
  }
}
