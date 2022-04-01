import { fakeAsync, tick } from '@angular/core/testing';
import { LoadingController } from '@ionic/angular';
import { catchError, of, Subject, toArray } from 'rxjs';
import { withSpinner } from './loading-spinner.operator'

describe('Loading Spinner Operator', () => {
    let loadingControllerSpy: jasmine.SpyObj<LoadingController>;
    let spinnerSpy: jasmine.SpyObj<HTMLIonLoadingElement>;

    beforeEach(() => {
        loadingControllerSpy = jasmine.createSpyObj<LoadingController>('controllerSpy', ['create']);
        spinnerSpy = jasmine.createSpyObj<HTMLIonLoadingElement>('loadingSpy', ['present', 'dismiss']);

        loadingControllerSpy.create.and.resolveTo(spinnerSpy);
        spinnerSpy.present.and.resolveTo();
        spinnerSpy.dismiss.and.resolveTo();
    })

    it('starts spinner on subscribe to original observable', fakeAsync(() => {
        const source = of(123).pipe(
            withSpinner(loadingControllerSpy)
        );

        expect(loadingControllerSpy.create).not.toHaveBeenCalled();
        source.subscribe();
        expect(loadingControllerSpy.create).toHaveBeenCalledWith(undefined);

        tick();
        expect(spinnerSpy.present).toHaveBeenCalled();
        expect(spinnerSpy.dismiss).toHaveBeenCalled();
    }))

    it('stops spinner on first emission', fakeAsync(() => {
        const source: Subject<number> = new Subject();

        source.pipe(
            withSpinner(loadingControllerSpy)
        ).subscribe();

        tick();
        expect(spinnerSpy.present).toHaveBeenCalled();
        expect(spinnerSpy.dismiss).not.toHaveBeenCalled();

        source.next(123);

        tick();
        expect(spinnerSpy.dismiss).toHaveBeenCalled();
    }));

    it('stops spinner on error', fakeAsync(() => {
        const source: Subject<number> = new Subject();

        source.pipe(
            withSpinner(loadingControllerSpy),
            catchError(() => of(null)) // Test won't complete without this
        ).subscribe();

        tick();
        expect(spinnerSpy.present).toHaveBeenCalled();
        expect(spinnerSpy.dismiss).not.toHaveBeenCalled();

        source.error(123);

        tick();
        expect(spinnerSpy.dismiss).toHaveBeenCalled();
    }));

    it('stops spinner on complete', fakeAsync(() => {
        const source: Subject<number> = new Subject();

        source.pipe(
            withSpinner(loadingControllerSpy)
        ).subscribe();

        tick();
        expect(spinnerSpy.present).toHaveBeenCalled();
        expect(spinnerSpy.dismiss).not.toHaveBeenCalled();

        source.complete();

        tick();
        expect(spinnerSpy.dismiss).toHaveBeenCalled();
    }));

    it('lets second emission through', (done) => {
        const source: Subject<number> = new Subject();

        source.pipe(
            withSpinner(loadingControllerSpy),
            toArray()
        ).subscribe(out => {
            expect(out).toEqual([1, 2])
            done();
        });

        source.next(1);
        source.next(2);
        source.complete();
    });
})