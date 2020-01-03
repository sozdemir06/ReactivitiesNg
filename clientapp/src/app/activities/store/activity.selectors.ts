import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState, selectAll } from './activity.reducer';


export const selectactivityState=createFeatureSelector<ActivityState>("activities");

export const selectAllActivit=createSelector(
    selectactivityState,
    selectAll
)


export const selectActivityLoading=createSelector(
    selectactivityState,
    state=>state.loading
)

export const selectActivityError=createSelector(
    selectactivityState,
    state=>state.error
)

export const getActiivtyById=(id:string | number)=>createSelector(
    selectAllActivit,
    activities=>activities.find(activity=>activity.id==id)
)

export const isActivityLoaded=createSelector(
    selectactivityState,
    state=>state.allActivityLoaded
)