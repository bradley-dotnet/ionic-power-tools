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
export class DynamicDialogModule {
  static forRoot(): ModuleWithProviders<DynamicDialogModule> {
    return {
      ngModule: DynamicDialogModule,
      providers: [
        DynamicDialogService
      ]
    };
  }
}
