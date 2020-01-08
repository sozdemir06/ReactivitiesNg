import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ActivityState, selectAll } from './activity.reducer';
import { IUser } from 'src/app/auth/models/IUser';
import { IACtivity } from './IActivity';
import * as AuthSelectors from "../../auth/store/auth-selectors";


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

export const isHost=(id:string | number)=>createSelector(
    AuthSelectors.selectCurrentUser,
    selectAllActivit,
    (currentUser:IUser,activities:IACtivity[])=>{
        const selectedActiivty=activities.find(a=>a.id===id);
        return selectedActiivty.attandees.some(a=>a.userName===currentUser.userName && a.isHost);   
    }
)

export const isGoing=(id:string | number)=>createSelector(
    AuthSelectors.selectCurrentUser,
    selectAllActivit,
    (currentUser:IUser,activities:IACtivity[])=>{
        const selectedActiivty=activities.find(a=>a.id==id);
        return selectedActiivty.attandees.some(a=>a.userName===currentUser.userName);   
    }
)
