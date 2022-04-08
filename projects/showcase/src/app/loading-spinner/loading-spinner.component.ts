import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { delay, of } from 'rxjs';
import { withSpinner } from 'ionic-power-tools';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent {

  constructor(private readonly loading: LoadingController) { }

  testSpinner(): void {
    of('Testing').pipe(
      delay(5000),
      withSpinner(this.loading)
    ).subscribe();
  }
}
