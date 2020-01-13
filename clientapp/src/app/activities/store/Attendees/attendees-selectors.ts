import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityStates } from '../reducers';
import * as fromAttendees from "./attendees-reducer";



export const selectState=createFeatureSelector<ActivityStates>("activity");

export const selectAttendeesState=createSelector(
    selectState,
    (state:ActivityStates)=>state.attendees
)

export const selectAllAttendees=createSelector(
    selectAttendeesState,
    fromAttendees.selectAll
)

export const loading=createSelector(
    selectAttendeesState,
    state=>state.loading
)

export const error=createSelector(
    selectAttendeesState,
    state=>state.error
)

