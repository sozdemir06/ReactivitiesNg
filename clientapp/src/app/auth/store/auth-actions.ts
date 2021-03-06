import { createAction, props } from '@ngrx/store';
import { IUser } from '../models/IUser';




export const login=createAction(
    "[User Login] User Login start",
    props<{model:any}>()
)

export const loginSuccess=createAction(
    "[User Loginn Success] User Login Success",
    props<{user:IUser}>()
)

export const loginFailure=createAction(
    "[Login Failure] Login Failed",
    props<{error:any}>()
)

export const decodeToken=createAction(
    "[Save decoded token] Save decoded token",
    props<{decodedToken:any}>()
)

export const logout=createAction(
    "[User Logout] Logout"
)