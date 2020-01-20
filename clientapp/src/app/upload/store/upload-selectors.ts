import { createFeatureSelector, createSelector, createAction } from '@ngrx/store';
import { UploadState, UploadStatus } from './upload-reducer';






export const selectUploadState=createFeatureSelector<UploadState>("upload");


export const getError=createSelector(
    selectUploadState,
    state=>state.error
);

export const getStarted=createSelector(
    selectUploadState,
    state=>state.status===UploadStatus.Started
)

export const getRequested=createSelector(
    selectUploadState,
    state=>state.status===UploadStatus.Requested
)

export const getReady=createSelector(
    selectUploadState,
    state=>state.status===UploadStatus.Ready
)

export const getProgress=createSelector(
    selectUploadState,
    state=>state.progress
)

export const getInProgress=createSelector(
    selectUploadState,
    state=>state.status===UploadStatus.Started && state.progress>=0
)

export const getFailed=createSelector(
    selectUploadState,
    state=>state.status===UploadStatus.Failed
)

export const getCompleted=createSelector(
    selectUploadState,
    state=>state.status===UploadStatus.Completed
)

export const getResult=createSelector(
    selectUploadState,
    state=>state.body
)