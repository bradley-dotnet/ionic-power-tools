import { Observable } from "rxjs";

export interface DynamicDialogContent<TOut = void> {
    complete$: Observable<TOut>;
}

export interface InitializedDynamicDialogContent<TIn, TOut = void> extends DynamicDialogContent<TOut> {
    init(data: TIn): void;
}