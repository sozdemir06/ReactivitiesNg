


import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UploadActions } from './upload-action-types';
import { concatMap, takeUntil, map, catchError } from 'rxjs/operators';
import { UploadService } from '../upload-service';
import { of } from 'rxjs';
import { ProfileActions } from 'src/app/profiles/store/profile-actions-types';

@Injectable({ providedIn: 'root' })
export class UploadEffect {
    constructor(
        private fileUploadService: UploadService,
        private action$: Actions
    ) { }


    uploadRequestedEfect$ = createEffect(
        () => this.action$.pipe(
            ofType(UploadActions.UploadRequestAction),
            concatMap(action =>
                this.fileUploadService.uploadFile(action.file).pipe(
                    takeUntil(
                        this.action$.pipe(
                            ofType(UploadActions.UploadCancelAction)
                        )
                    )
                )
            ),
            map(event => this.getActionFromHttpEvent(event)),
            catchError(error => of(UploadActions.UploadFailureAction({ error })))
        )
    )



    private getActionFromHttpEvent(event: HttpEvent<any>) {
        switch (event.type) {
            case HttpEventType.Sent: {
                return UploadActions.UploadStartedAction();
            }
            case HttpEventType.UploadProgress: {
                return UploadActions.UploadProgressAction({
                    progress: Math.round((100 * event.loaded) / event.total)
                });
            }
            //case HttpEventType.ResponseHeader:
            case HttpEventType.Response: {
                if (event.status === 200) {
                          ProfileActions.addNewProfilePhoto({image:event.body}) 
                    return UploadActions.UploadCompleteAction({data:event.body});
                } else {
                    return UploadActions.UploadFailureAction({
                        error: event.statusText
                    });
                }
            }
            default: {
                return UploadActions.UploadFailureAction({
                    error: `Unknown Event: ${JSON.stringify(event)}`
                });
            }

        }
    }

}