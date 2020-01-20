import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState, selectAll } from './profile-reducer';



export const selectProfileState=createFeatureSelector<ProfileState>("profile");



export const selectProfile=createSelector(
    selectProfileState,
    state=>state.profile
)

export const profileError=createSelector(
    selectProfileState,
    state=>state.error
)

export const profileLoading=createSelector(
    selectProfileState,
    state=>state.loading
)

