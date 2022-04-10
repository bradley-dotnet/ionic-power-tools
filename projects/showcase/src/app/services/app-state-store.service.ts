import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

interface AppState {
  currentPage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppStateStoreService extends ComponentStore<AppState> {
  public currentPage$ = this.select(s => s.currentPage);

  constructor() {
    super({
      currentPage: ''
    });
  }

  public setCurrentPage = this.updater((state: AppState, title: string) => ({
    ...state,
    currentPage: title
  }));
}
