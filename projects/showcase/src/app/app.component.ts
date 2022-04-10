import { Component } from '@angular/core';
import { AppStateStoreService } from './services/app-state-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title$ = this.appStore.currentPage$;

  constructor(private readonly appStore: AppStateStoreService) { }
}
