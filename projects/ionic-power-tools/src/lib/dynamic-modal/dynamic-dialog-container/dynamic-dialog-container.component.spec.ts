import { ComponentRef, ViewContainerRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { of } from 'rxjs';
import { DynamicDialogContent, InitializedDynamicDialogContent } from '../dialog-component.interface';
import { DynamicDialogContainerComponent } from './dynamic-dialog-container.component';

describe('DynamicDialogContainerComponent', () => {
  let modalControllerSpy: jasmine.SpyObj<ModalController>;
  let viewSpy: jasmine.SpyObj<ViewContainerRef>;
  let component: DynamicDialogContainerComponent<string, string>;

  beforeEach(() => {
    modalControllerSpy = jasmine.createSpyObj<ModalController>('modalControllerSpy', ['dismiss']);
    viewSpy = jasmine.createSpyObj<ViewContainerRef>('viewSpy', ['createComponent']);

    component = new DynamicDialogContainerComponent(modalControllerSpy)
    component.creationSite = viewSpy;
  });
  
  afterEach(() => {
    component.ngOnDestroy();
  });

  it('standard dialog dismisses with content result', () => {
    viewSpy.createComponent.and.returnValue({ instance: {
      complete$: of('result')
    }} as ComponentRef<DynamicDialogContent<string>>);
    component.ngOnInit();

    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith('result');
  });

  it('initialized dialog has init called and dismisses with content result', () => {
    const initSpy = jasmine.createSpy<(test: string) => void>('initSpy');
    viewSpy.createComponent.and.returnValue({ instance: {
      complete$: of('result'),
      init: initSpy
    } as InitializedDynamicDialogContent<string, string> } as ComponentRef<InitializedDynamicDialogContent<string, string>>);

    component.initialData = 'initial data';
    component.ngOnInit();

    expect(initSpy).toHaveBeenCalledWith('initial data');
    expect(modalControllerSpy.dismiss).toHaveBeenCalledWith('result');
  });
});
