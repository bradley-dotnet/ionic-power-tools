import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogService } from './dynamic-dialog.service';
import { DynamicDialogContainerComponent } from './dynamic-dialog-container/dynamic-dialog-container.component';



@NgModule({
  declarations: [
    DynamicDialogContainerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DynamicModalModule {
  static forRoot(): ModuleWithProviders<DynamicModalModule> {
    return {
      ngModule: DynamicModalModule,
      providers: [
        DynamicDialogService
      ]
    };
  }
}
