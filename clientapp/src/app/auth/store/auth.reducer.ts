import { IUser } from '../models/IUser'
import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth-actions.types';




export interface AuthState {
    loading: boolean;
    error: any;
    user: IUser,
    decodedToken:any;
}




export const authInitialState: AuthState = {
    loading: false,
    error: undefined,
    user: undefined,
    decodedToken:null
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

    on(AuthActions.decodeToken,(state,action)=>{
        return {
            ...state,
            decodedToken:action.decodedToken
        }
    }),

    on(AuthActions.logout,(state,action)=>{
        return{
            ...state,
            decodedToken:null,
            user:null,
        }
    })

)

