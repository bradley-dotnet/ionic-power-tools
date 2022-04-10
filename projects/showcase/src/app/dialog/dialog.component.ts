import { Component } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { AppStateStoreService } from '../services/app-state-store.service';
import { DynamicDialogService } from 'ionic-power-tools';
import { NameDialogComponent } from './name-dialog/name-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  public name$: Observable<string> | undefined = undefined;

  constructor(
    private readonly appStore: AppStateStoreService,
    private readonly dialogs: DynamicDialogService
  ) { }

  public ionViewWillEnter(): void {
    this.appStore.setCurrentPage('Dynamic Dialogs');
  }

  public getUserName(): void {
    this.name$ = this.dialogs.showDialog(NameDialogComponent);
  }
}
