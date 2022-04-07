import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { DynamicDialogContent, InitializedDynamicDialogContent } from './dialog-component.interface';
import { DynamicDialogContainerComponent } from './dynamic-dialog-container/dynamic-dialog-container.component';
import { DynamicDialogService } from './dynamic-dialog.service';

class SimpleDialog implements DynamicDialogContent<string> {
  complete$: Subject<string> = new Subject();
}

class InitializedDialog implements InitializedDynamicDialogContent<string, string> {
  complete$: Subject<string> = new Subject();

  init(data: string): void {
  }
}

describe('DynamicDialogService', () => {
  let service: DynamicDialogService;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;

  beforeEach(() => {
    const mockModal = jasmine.createSpyObj<HTMLIonModalElement>('modalSpy', ['onWillDismiss']);
    mockModal.onWillDismiss.and.returnValue(Promise.resolve({ data: 'Result'}));

    modalControllerSpy = jasmine.createSpyObj<ModalController>('modalControllerSpy', ['create']);
    modalControllerSpy.create.and.returnValue(Promise.resolve(mockModal));
    service = new DynamicDialogService(modalControllerSpy);
  });

  it('Simple Dialog is created and returns dialog result', (done) => {
    service.showDialog(SimpleDialog, { cssClass: 'TestClass'}).subscribe(result => {
      expect(modalControllerSpy.create).toHaveBeenCalledWith({
        cssClass: 'TestClass',
        component: DynamicDialogContainerComponent,
        componentProps: {
          componentFactory: SimpleDialog
        }
      })
      expect(result).toBe('Result');
      done();
    });
  });

  it('Initialized Dialog is created with initial data and returns dialog result', (done) => {
    service.showInitializedDialog(InitializedDialog, 'Input', { cssClass: 'TestClass'}).subscribe(result => {
      expect(modalControllerSpy.create).toHaveBeenCalledWith({
        cssClass: 'TestClass',
        component: DynamicDialogContainerComponent,
        componentProps: {
          initialData: 'Input',
          componentFactory: InitializedDialog
        }
      });
      expect(result).toBe('Result');
      done();
    });
  });
});
