import { createAction, props } from '@ngrx/store';
import { IProfile, IProfileImage } from '../models/IProfile';




export const loadProfileStart=createAction(
    "[Load Profile Start] Profile",
    props<{username:string}>()
)

export const loadProfileSuccess=createAction(
    "[Load Profile Success] Profile",
    props<{profile:IProfile}>()
)

export const loadProfileDailure=createAction(
    "[Load Profile Failure] Profile",
    props<{error:any}>()
)


export const addNewProfilePhoto=createAction(
    "[Add New Photo] Add New",
    props<{image:IProfileImage}>()
)