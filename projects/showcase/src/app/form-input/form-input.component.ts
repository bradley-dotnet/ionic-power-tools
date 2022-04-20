import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppStateStoreService } from '../services/app-state-store.service';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent {
  public form!: FormGroup;

  constructor(
    private readonly appStore: AppStateStoreService
  ) { }

  public ionViewWillEnter(): void {
    this.appStore.setCurrentPage('Form Input');

    this.form = new FormGroup({
      requiredTest: new FormControl('', Validators.required)
    });
  }

}
