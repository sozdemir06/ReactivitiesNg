import { createAction, props } from '@ngrx/store';
import { IACtivity, IActivityEnvelope} from './IActivity';
import { Update } from '@ngrx/entity';



export const loadActivity=createAction(
    "[Load Activity] Load Activity"
)

export const loadedActivitySuccess=createAction(
    "[Loaded Activity Success] Loaded activity Success",
    props<{activitiesEnvelope:IActivityEnvelope}>()
)

export const loadActivityFailure=createAction(
    "[Load Activity Failure] Load Activity Failure",
    props<{error:any}>()
)

export const createActitivity=createAction(
    "[Add New Activity] Added New Actiivity",
    props<{activity:IACtivity}>()
    
)

export const createActitivitySuccess=createAction(
    "[Create New Activity] Create New Actiivty Success",
    props<{activity:IACtivity}>()
)

export const createActitivityError=createAction(
    "[Add New Activity Error] Add New Actiivtiy Error",
    props<{error:any}>()
)

export const updateActivity=createAction(
    "[Update ACtivity] Update Activity",
    props<{update:Update<IACtivity>}>()
)

export const updateActivitySuccess=createAction(
    "[Update Activity Success] Update Activity Success",
    props<{update:Update<IACtivity>}>()
)

export const updateActivityErrro=createAction(
    "[Update Actiivty Error] Update Activity Error",
    props<{error:any}>()
)

//Load More
export const loadMoreStart=createAction(
    "[Load More Start] Activities",
    props<{limit:any,page:any}>()
)

export const loadMoreSuccess=createAction(
    "[Load More Success] Activities",
    props<{activitiesEnvelope:IActivityEnvelope}>()
)

export const loadMoreFailed=createAction(
    "[Load More Failure] Activities",
    props<{error:any}>()
)


//Send Comment With SignalR

export const sendCommentStart=createAction(
    "[Send Comment Start] Comment",
    props<{model:any}>()
)

export const sendCommentSuccess=createAction(
    "[Send Comment Success] Comment",
    props<{comment:any}>()
)

export const sendCommentFailure=createAction(
    "[Send Comment Failure] Comment",
    props<{error:any}>()
)




