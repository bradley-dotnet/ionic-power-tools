import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { delay, of } from 'rxjs';
import { withSpinner } from 'ionic-power-tools';
import { AppStateStoreService } from '../services/app-state-store.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  constructor(private readonly loading: LoadingController,
    private readonly appStore: AppStateStoreService) { }

  public ionViewWillEnter(): void {
    this.appStore.setCurrentPage('Loading Spinner');
  }

  testSpinner(): void {
    of('Testing').pipe(
      delay(5000),
      withSpinner(this.loading)
    ).subscribe();
  }
}
