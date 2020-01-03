import { Injectable } from "@angular/core";
import { ValueService } from './value.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ValueActions } from './value-action.types';
import { concatMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable()
export class ValueEffects {

    constructor(
        private valueService: ValueService,
        private actions$: Actions
    ) { }

    loadAllValues$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(ValueActions.loadAllvalues),
                concatMap(action => this.valueService.getAllValues()),
                map(values => ValueActions.loadedAllValues({ values })),
                catchError(error=>of(error)),
            )
    )

}