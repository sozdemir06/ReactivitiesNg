import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState, selectAll, selectTotal } from './activity.reducer';
import { IUser } from 'src/app/auth/models/IUser';
import { IACtivity, IAttendees } from './IActivity';
import * as AuthSelectors from "../../auth/store/auth-selectors";
import { ActivityStates } from './reducers';
import * as AttendeesSelectors from "./Attendees/attendees-selectors";

export const selectState=createFeatureSelector<ActivityStates>("activity");
export const selectActivityState=createSelector(
    selectState,
    (state:ActivityStates)=>state.activities,
)
export const selectAllActivit=createSelector(
    selectActivityState,
    selectAll
)


export const selectActivityLoading=createSelector(
    selectActivityState,
    state=>state.loading
)

export const selectActivityError=createSelector(
    selectActivityState,
    state=>state.error
)

export const getActiivtyById=(id:string | number)=>createSelector(
    selectAllActivit,
    activities=>activities.find(activity=>activity.id==id)
)

export const isActivityLoaded=createSelector(
    selectActivityState,
    state=>state.allActivityLoaded
)

export const isHost=(id:string | number)=>createSelector(
    AuthSelectors.selectCurrentUser,
    AttendeesSelectors.selectAllAttendees,
    (currentUser:IUser,attendees:IAttendees[])=>{
        return attendees.some(a=>a.userName===currentUser.userName && a.isHost);   
    }
)

export const isGoing=(id:string | number)=>createSelector(
    AuthSelectors.selectCurrentUser,
    AttendeesSelectors.selectAllAttendees,
    (currentUser:IUser,attendees:IAttendees[])=>{
        return attendees.some(a=>a.userName===currentUser.userName);   
    }
)

export const activityCount=createSelector(
    selectActivityState,
    state=>state.activityCount
)

//Load More
export const loadMoreLoading=createSelector(
    selectActivityState,
    state=>state.loadMoreLoading
)

export const getActivityCount=createSelector(
    selectActivityState,
    selectTotal
)
