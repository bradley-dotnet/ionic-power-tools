import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DynamicDialogContent } from 'ionic-power-tools';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-name-dialog',
  templateUrl: './name-dialog.component.html',
  styleUrls: ['./name-dialog.component.scss']
})
export class NameDialogComponent implements DynamicDialogContent<string> {
  complete$: Subject<string> = new Subject();
  nameControl: FormControl = new FormControl();

  public submit(): void {
    this.complete$.next(this.nameControl.value);
  }
}
