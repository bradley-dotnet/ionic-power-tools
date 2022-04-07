import { Injectable, Type } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { from, map, Observable, switchMap } from 'rxjs';
import { DynamicDialogContent, InitializedDynamicDialogContent } from './dialog-component.interface';
import { DynamicDialogContainerComponent } from './dynamic-dialog-container/dynamic-dialog-container.component';

export type DialogOptions = Omit<ModalOptions, 'component' | 'componentProps'>;

@Injectable()
export class DynamicDialogService {

  constructor(private readonly ionicModal: ModalController) { }

  public showDialog<TOut = void>(
    content: Type<DynamicDialogContent<TOut>>,
    options: Partial<DialogOptions> = {}): Observable<TOut> {
    return this.handleDialogRequest({
      ...options,
      component: DynamicDialogContainerComponent,
      componentProps: {
        componentFactory: content
      }
    });
  }

  public showInitializedDialog<TIn, TOut = void >(
    content: Type<InitializedDynamicDialogContent<TIn, TOut>>,
    data: TIn,
    options: Partial<DialogOptions> = {}): Observable<TOut> {
    return this.handleDialogRequest({
      ...options,
      component: DynamicDialogContainerComponent,
      componentProps: {
        initialData: data,
        componentFactory: content
      }
    });
  }

  private handleDialogRequest<TOut>(ionicOptions: ModalOptions): Observable<TOut> {
    return from(this.ionicModal.create(ionicOptions)).pipe(
      switchMap(modal => from(modal.onWillDismiss())),
      map(({ data }) => data as TOut)
    )
  } 
}
