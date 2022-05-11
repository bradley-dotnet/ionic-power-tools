import { Component } from '@angular/core';
import { NavigationTargets } from '../navigation-targets.enum';
import { AppStateStoreService } from '../services/app-state-store.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    constructor(private readonly appStore: AppStateStoreService) { }

    public ionViewWillEnter(): void {
        this.appStore.setCurrentPage('');
    }

    public NavigationTargets = NavigationTargets;
}
