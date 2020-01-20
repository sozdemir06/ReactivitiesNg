import { createReducer, on } from '@ngrx/store';
import { UploadActions } from './upload-action-types';

export enum UploadStatus {
    Ready = 'Ready',
    Requested = 'Requested',
    Started = 'Started',
    Failed = 'Failed',
    Completed = 'Completed'
  }
  
  export interface UploadState {
    status: UploadStatus;
    error: string | null;
    progress: number | null;
    body:any;
  }
  
  export const initialState: UploadState = {
    status: UploadStatus.Ready,
    error: null,
    progress: null,
    body:null
  };


  export const uploadReducer=createReducer(
      initialState,
      on(UploadActions.UploadRequestAction,(state,action)=>{
          return{
              ...state,
              status:UploadStatus.Requested,
              progress:null,
              error:null
          }
      }),
      on(UploadActions.UploadCancelAction,(state,action)=>{
          return{
              ...state,
              status:UploadStatus.Ready,
              progress:null,
              error:null
          }
      }),
      on(UploadActions.UploadResetAction,(state,action)=>{
          return{
              ...state,
              status:UploadStatus.Ready,
              progress:null,
              error:null
              
          }
      }),

      on(UploadActions.UploadFailureAction,(state,action)=>{
          return{
              ...state,
              status:UploadStatus.Failed,
              error:action.error
          }
      }),
      on(UploadActions.UploadStartedAction,(state,action)=>{
          return{
            ...state,
            status: UploadStatus.Started,
            progress: 0
          }
      }),

      on(UploadActions.UploadProgressAction,(state,action)=>{
          return{
              ...state,
              progress:action.progress
          }
      }),
      on(UploadActions.UploadCompleteAction,(state,action)=>{
          return{
              ...state,
              status:UploadStatus.Completed,
              progress:100,
              error:null,
              body:action.data
          }
      })

  )