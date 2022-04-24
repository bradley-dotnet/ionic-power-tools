import { Type } from "@angular/core";
import { LazyChildren } from './dynamic-route.model';

export const populateComponents = <TEntries extends number>(
    map: Record<TEntries, Type<any>>,
    routes: LazyChildren<unknown, TEntries>[]) => {
    routes.forEach(r => {
        if (r.component) {
            // Replace the enum with the actual component
            // Types differ here of course; but that's OK
            r.component = map[r.component] as any;
        }

        if (r.children) {
            populateComponents(map, r.children)
        }
    });
}