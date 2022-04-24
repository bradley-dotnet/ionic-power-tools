import { Component } from '@angular/core';
import { AppStateStoreService } from '../services/app-state-store.service';

@Component({
  selector: 'app-dynamic-router',
  templateUrl: './dynamic-router.component.html',
  styleUrls: ['./dynamic-router.component.scss']
})
export class DynamicRouterComponent {

  constructor(
    private readonly appStore: AppStateStoreService
  ) { }

  public ionViewWillEnter(): void {
    this.appStore.setCurrentPage('Dynamic Router');
  }

}
