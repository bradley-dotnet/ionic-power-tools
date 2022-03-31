import { LoadingController, LoadingOptions } from '@ionic/angular';
import { catchError, defer, from, MonoTypeOperatorFunction, Observable, of, share, switchMap, take, tap } from 'rxjs';

export function withSpinner<T>(loadingController: LoadingController, options?: LoadingOptions): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) => {
        return defer(() => {
            let spinnerCache: HTMLIonLoadingElement;
            const shared = source.pipe(
                share()
            );
            
            from(loadingController.create(options)).pipe(
                switchMap(spinner => {
                    spinnerCache = spinner;
                    return spinner.present();
                }),
                switchMap(() => shared),
                catchError(() => of(null)),
                take(1)
            ).subscribe({
                complete: () => {
                    from(spinnerCache.dismiss()).subscribe();
                }
            })

            return shared;
        });
    }
}