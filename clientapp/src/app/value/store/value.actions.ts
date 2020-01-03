import { createAction, props } from '@ngrx/store';
import { IValue } from './model';


export const loadAllvalues=createAction(
    "[Load Values] Load Values"
)


export const loadedAllValues=createAction(
    "[Loaded All Values] Loaded All Values",
    props<{values:IValue[]}>()
)