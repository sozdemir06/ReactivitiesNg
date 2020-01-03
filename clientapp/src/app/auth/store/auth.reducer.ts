import { IUser } from '../models/IUser'
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth-actions.types';




export interface AuthState {
    loading: boolean;
    error: any;
    user: IUser
}




export const authInitialState: AuthState = {
    loading: false,
    error: undefined,
    user: undefined
};

export const authReducer = createReducer(
    authInitialState,
    on(AuthActions.login, (state, action) => {
        return {
            ...state, 
            loading: true,
            error: undefined,
            user: null
        }
    }),

    on(AuthActions.loginSuccess,
        (state, action) => {
            return {
               ...state, 
               loading:false,
               error:undefined,
               user:action.user 
            }
        }),
    on(AuthActions.loginFailure, (state, action) =>{
        return {
            ...state, 
           loading:false,
           error:action.error,
           user:null
        }
    }),

)

