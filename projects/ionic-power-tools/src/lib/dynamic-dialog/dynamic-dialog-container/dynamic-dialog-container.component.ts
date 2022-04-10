import { Component, Input, OnDestroy, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject, take, takeUntil } from 'rxjs';
import { DynamicDialogContent, InitializedDynamicDialogContent } from '../dialog-component.interface';

@Component({
  selector: 'lib-dynamic-dialog-container',
  templateUrl: './dynamic-dialog-container.component.html'
})
export class DynamicDialogContainerComponent<TIn, TOut> implements OnInit, OnDestroy {
  @Input() public initialData!: TIn;
  @Input() public componentFactory!: Type<DynamicDialogContent<TOut> | InitializedDynamicDialogContent<TIn, TOut>>;
  @ViewChild('creationSite', { static: true, read: ViewContainerRef}) public creationSite!: ViewContainerRef;
  private destroy$ = new Subject<null>();

  constructor(private readonly modalController: ModalController) { }

  ngOnInit(): void {
    const created = this.creationSite.createComponent(this.componentFactory).instance;
    if (this.isInitializedDialog(created)) {
      created.init(this.initialData);
    }

    created.complete$.pipe(
      take(1),
      takeUntil(this.destroy$)
    ).subscribe((result) => {
      this.modalController.dismiss(result);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  private isInitializedDialog(dialog: DynamicDialogContent<TOut> | InitializedDynamicDialogContent<TIn, TOut>):
    dialog is InitializedDynamicDialogContent<TIn, TOut> {
      return (dialog as InitializedDynamicDialogContent<TIn, TOut>).init !== undefined;
    }
}
