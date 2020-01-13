import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IACtivity } from './IActivity';
import { createReducer, on } from '@ngrx/store';
import { ActivityActions } from './activity-actions.types';



export interface ActivityState extends EntityState<IACtivity> {
    allActivityLoaded:boolean;
    loading: boolean;
    error: any;
    
}


export const adapter = createEntityAdapter<IACtivity>({
    
});




export const initialActivityState = adapter.getInitialState({
    loading: false,
    error: null,
    allActivityLoaded:false

})

export const activityReducer = createReducer(
    initialActivityState,
    on(ActivityActions.loadActivity,
        (state, action) => ({
            ...state,
            loading: true,
            error: null
        })
    ),

    on(ActivityActions.loadedActivitySuccess,
        (state, action) => adapter.addAll(action.activities,
            {
                ...state,
                loading: false,
                error: null,
                allActivityLoaded:true
            })
    ),

    on(ActivityActions.loadActivityFailure,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })),
    on(ActivityActions.createActitivity,
        (state, action) => ({
            ...state,
            loading: true,
            error: null,

        })
    ),

    on(ActivityActions.createActitivitySuccess,
        (state, action) => adapter.addOne(action.activity, {
            ...state,
            loading: false,
            error: null,
            
        })

    ),

    on(ActivityActions.createActitivityError,
        (state, action) => ({
            ...state,
            loading: false,
            error: action.error
        })

    ),


    on(ActivityActions.updateActivity, (state, action) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(ActivityActions.updateActivitySuccess,
        (state, action) => adapter.updateOne(action.update, {

            ...state,
            loading: false,
            error: null
        })

    ),

    on(ActivityActions.updateActivityErrro, (state, action) => ({
        ...state,
        loading: false,
        error: action.error
    })),



)

export const { selectAll, selectEntities, selectIds } = adapter.getSelectors();