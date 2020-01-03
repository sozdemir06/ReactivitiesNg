import { createFeatureSelector, createSelector, State } from '@ngrx/store';
import { AuthState } from './auth.reducer';





export const selectAuthState = createFeatureSelector<AuthState>("auth");




export const isLoggedIn = createSelector(
    selectAuthState,
    state => !!state.user
)

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
)

export const loading = createSelector(
    selectAuthState,
    state => state.loading
)

export const error = createSelector(
    selectAuthState,
    state => state.error
)

export const selectCurretUser = createSelector(
    selectAuthState,
    state => state.user
)