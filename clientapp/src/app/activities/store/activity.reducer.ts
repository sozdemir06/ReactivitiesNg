import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IACtivity } from './IActivity';
import { createReducer, on } from '@ngrx/store';
import { ActivityActions } from './activity-actions.types';



export interface ActivityState extends EntityState<IACtivity> {
    allActivityLoaded:boolean;
    loading: boolean;
    error: any;
    commentLoading:boolean;
    commentError:any;
    comment:[],
    activityCount:number;
    loadMoreLoading:boolean;
    LoadingMoreError:any;
    
}


export const adapter = createEntityAdapter<IACtivity>({
    
});




export const initialActivityState = adapter.getInitialState({
    loading: false,
    error: null,
    allActivityLoaded:false,
    commentLoading:false,
    commentError:null,
    comment:null,
    activityCount:0,
    loadMoreLoading:false,
    LoadingMoreError:null


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
        (state, action) => adapter.addAll(action.activitiesEnvelope.activities,
            {
                ...state,
                loading: false,
                error: null,
                allActivityLoaded:true,
                activityCount:action.activitiesEnvelope.activityCount
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

    //Load More Start
    on(ActivityActions.loadMoreStart,(state,action)=>{
        return{
            ...state,
            loadMoreLoading:true,
            LoadingMoreError:null
        }
    }),
    on(ActivityActions.loadMoreSuccess,
        (state, action) => adapter.addMany(action.activitiesEnvelope.activities, {

            ...state,
            loadMoreLoading:false,
            LoadingMoreError:null
        })

    ),

    on(ActivityActions.loadMoreFailed,(state,action)=>{
        return{
            ...state,
            loadMoreLoading:false,
            LoadingMoreError:action.error
        }
    }),


    //SignalR Comment

    on(ActivityActions.sendCommentStart,(state,action)=>{
        return{
            ...state,
            commentLoading:true,
            commentError:null
        }
    }),
    on(ActivityActions.sendCommentSuccess,(state,action)=>{
        return{
            ...state,
            commentLoading:false,
            commentError:null,
            comment:[...action.comment],

        }
    }),
    on(ActivityActions.sendCommentFailure,(state,action)=>{
        return{
            ...state,
            commentLoading:true,
            commentError:null,
            comment:null
        }
    })



)

export const { selectAll, selectEntities, selectIds,selectTotal } = adapter.getSelectors();