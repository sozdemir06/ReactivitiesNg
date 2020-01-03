import { IValue } from './model';
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from '@ngrx/store';
import { ValueActions } from './value-action.types';

export interface ValuesState extends EntityState<IValue> {
    allvaluesLoaded: boolean;
}

export const adapter = createEntityAdapter<IValue>();

export const initialValueState = adapter.getInitialState({
    allValuesLoaded: false
});

export const valuesReducer = createReducer(
    initialValueState,
    on(ValueActions.loadedAllValues,
        (state, action) => adapter.addAll(action.values,
            {
                ...state,
                allValuesLoaded: true
            }

        ))
)


export const { selectAll } = adapter.getSelectors();