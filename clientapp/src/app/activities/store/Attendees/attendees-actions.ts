import { createAction, props} from '@ngrx/store'
import { IAttendees } from '../IActivity'

export const loadAttendees=createAction(
    "[Load Attendees] Load Attendees",
    props<{activityId:string | number}>()
)


export const attendSuccess=createAction(
    "[Get Attend Succes] Get Attend Success",
    props<{attendees:IAttendees[]}>()

)

export const attendFailure=createAction(
    "[Get  Attend Failure] Attend Failure",
    props<{error:any}>()
)

export const joinActivity=createAction(
    "[Join Activity] Activity Detail",
    props<{attendees:IAttendees,activityId:string | number}>()
)

export const joinActivitySuccess=createAction(
    "[Join Activity Success] Join Success",
    props<{attendees:IAttendees}>()
)

export const joinActivityFailure=createAction(
    "[Join Activity Failure] Join Failure",
    props<{error:any}>()
)

export const cancelJoiningActivity=createAction(
    "[Cancel Joining Activity] Cancel Joining",
    props<{activityId:string}>()
)

export const cancelJoiningActivitySuccess=createAction(
    "[Cancel Joining success] Cancel Joining Success",
    props<{attendeesId:string}>()
)

export const cancelJoiningActivityFailure=createAction(
    "[Cancel Joining Failure] Cancel Joining Failure",
    props<{error:any}>()
)
