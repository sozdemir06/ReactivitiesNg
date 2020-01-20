import { createAction, props } from '@ngrx/store';





export const UploadRequestAction=createAction(
    "[File Upload Form] Request",
    props<{file:File}>()
)

export const UploadCancelAction=createAction(
    "[File Upload Form] Cancel",
)

export const UploadResetAction=createAction(
    "[File Upload Reset] Reset"
)

export const UploadStartedAction=createAction(
    "[File Uplaod Api] Started",

)

export const UploadProgressAction=createAction(
    "[File Upload Api] Progress",
    props<{progress:number}>()
)

export const UploadFailureAction=createAction(
    "[File Upload Api] Failure",
    props<{error:any}>()
)

export const UploadCompleteAction=createAction(
    "[File Upload Api] Copleted",
    props<{data:any}>()
)