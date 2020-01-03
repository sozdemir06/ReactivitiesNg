

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { tap, first, finalize, filter } from 'rxjs/operators';
import { ActivityActions } from './activity-actions.types';
import { isActivityLoaded } from './activity.selectors';

@Injectable({ providedIn: 'root' })
export class ActivityResolver implements Resolve<any> {
    loaded: boolean = false;
    constructor(
        private store: Store<AppState>
    ) { }
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.store
            .pipe(
                select(isActivityLoaded),
                tap(activityLoaded => {
                    if (!this.loaded && !activityLoaded) {
                        this.loaded = true;
                        this.store.dispatch(ActivityActions.loadActivity());
                    }

                }),
                filter(activityLoaded=>activityLoaded),
                first(),
                finalize(() => this.loaded = false)
            )
    }
}