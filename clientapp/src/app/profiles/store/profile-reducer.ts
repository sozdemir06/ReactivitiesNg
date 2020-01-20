import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { IProfile } from '../models/IProfile';
import { createReducer, on, State } from '@ngrx/store';
import { ProfileActions } from './profile-actions-types';



export interface ProfileState extends EntityState<IProfile> {
    loading: boolean;
    error: any;
    profile:IProfile;
}


export const profileAdapter = createEntityAdapter<IProfile>({

})


export const profileInitialState = profileAdapter.getInitialState({
    loading: false,
    error: null,
    profile:null
})


export const profileReducer = createReducer(
    profileInitialState,
    on(ProfileActions.loadProfileStart, (state, action) => ({
        ...state,
        loading: true,
        error: null
    })),
    on(ProfileActions.loadProfileSuccess,
        (state, action) => ({
            ...state,
            loading: false,
            error: null,
            profile:{...action.profile}

        })),
    on(ProfileActions.loadProfileDailure,(state,action)=>({
        ...state,
        loading:false,
        error:null
    })),
    on(ProfileActions.addNewProfilePhoto,(state,action)=>{
        return{
            ...state,
            profile:[...state.profile.photos,action.image]
        }
    })

)


export const {selectAll}=profileAdapter.getSelectors();