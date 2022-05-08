import { Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { DynamicRouter } from 'ionic-power-tools';
import { NavigationTargets } from '../navigation-targets.enum';
import { AppStateStoreService } from '../services/app-state-store.service';

@Component({
    selector: 'app-dynamic-router',
    templateUrl: './dynamic-router.component.html',
    styleUrls: ['./dynamic-router.component.scss']
})
export class DynamicRouterComponent {

    constructor(
        private readonly appStore: AppStateStoreService,
        private dynamicRouter: DynamicRouter<NavigationTargets>
    ) { }

    public NavigationTargets = NavigationTargets;

    public JSON = JSON;

    public selectedTarget = new FormControl(NavigationTargets.Dialog);

    public ionViewWillEnter(): void {
        this.appStore.setCurrentPage('Dynamic Router');
    }

    public goToTarget(): void {
        console.log(this.selectedTarget.value);
        this.dynamicRouter.navigateTo(this.selectedTarget.value);
    }

}
