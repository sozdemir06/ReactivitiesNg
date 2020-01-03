import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ValuesState, selectAll } from './values.reducers';


export const selectValuesState=createFeatureSelector<ValuesState>("values");


export const selectAllValues=createSelector(
    selectValuesState,
    selectAll
)


export const areValuesLoaded=createSelector(
    selectValuesState,
    state=>state.allvaluesLoaded
)