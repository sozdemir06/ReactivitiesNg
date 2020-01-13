import {  ActionReducerMap } from '@ngrx/store';
import { activityReducer, ActivityState } from './activity.reducer';
import { attendeesReducer, AttendeesState } from './Attendees/attendees-reducer';


export interface ActivityStates{
    activities:ActivityState,
    attendees:AttendeesState
}
export const activityReducers:ActionReducerMap<ActivityStates>={
    activities:activityReducer,
    attendees:attendeesReducer

}