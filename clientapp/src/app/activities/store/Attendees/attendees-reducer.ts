import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IAttendees } from '../IActivity';
import { createReducer, on, State } from '@ngrx/store';
import { AttendeesActions } from './attandees-actions-types';



export interface AttendeesState extends EntityState<IAttendees> {
    loadedAllAttendees: boolean;
    loading: boolean;
    error: any;
}


export const adapter = createEntityAdapter<IAttendees>({
    
});

export const attendeesInitialState = adapter.getInitialState({
    loadedAllAttendees: false,
    loading: false,
    error: null
})


export const attendeesReducer = createReducer(
    attendeesInitialState,

    //load attendees
    on(AttendeesActions.loadAttendees,
        (state, action) => ({
            ...state,
            loading: true,
            error: null,
            loadedAllAttendees: false
        })
    ),

    on(AttendeesActions.attendSuccess,
        (state, action) => adapter.addAll(action.attendees, {
            ...state,
            loading: false,
            error: null
        })),
    on(AttendeesActions.attendFailure,(state,action)=>({
        ...state,
        loading:false,
        error:action.error,

    })),

    //join activity
    on(AttendeesActions.joinActivity,
        (state,action)=>({
            ...state
        })
    ),

    on(AttendeesActions.joinActivitySuccess,
        (state,action)=>adapter.addOne(action.attendees,state)
        
    ),

    on(AttendeesActions.joinActivityFailure,(state,action)=>({
        ...state
    })),

     //cancel Joining Activity
     on(AttendeesActions.cancelJoiningActivity,(state,action)=>({
         ...state
     })),

     on(AttendeesActions.cancelJoiningActivitySuccess,
        (state,action)=>adapter.removeOne(action.attendeesId,state)
    ),

    on(AttendeesActions.cancelJoiningActivityFailure,(state,action)=>({
        ...state
    }))
    


    
)



export const {selectAll}=adapter.getSelectors();