



import { Injectable } from '@angular/core';
import { ActivityService } from '../activity-service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AttendeesActions } from './attandees-actions-types';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { IAttendees } from '../IActivity';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AttendeesEffect {
    constructor(
        private activityService: ActivityService,
        private actions$: Actions

    ) { }


    ATTENDEES_ACTIONS_ERROR = [
        AttendeesActions.attendFailure,
        AttendeesActions.joinActivityFailure,
        AttendeesActions.cancelJoiningActivityFailure
    ]

    ATTENDEES_ACTIONS_SUCCESS = [
        AttendeesActions.joinActivitySuccess,
        AttendeesActions.attendSuccess,
        AttendeesActions.cancelJoiningActivitySuccess
    ]

    loadAttendees$ = createEffect(
        () => this.actions$.pipe(
            ofType(AttendeesActions.loadAttendees),
            switchMap((action) =>
                this.activityService.getactivityAttendees(action.activityId).pipe(
                    map((attendees: IAttendees[]) => AttendeesActions.attendSuccess({ attendees })),
                    catchError(error => of(AttendeesActions.attendFailure({ error })))
                )
            )
        )
    )

    joinActivity = createEffect(
        () => this.actions$.pipe(
            ofType(AttendeesActions.joinActivity),
            switchMap((action) =>
                this.activityService.joinActivity(action.activityId).pipe(
                    map(() => AttendeesActions.joinActivitySuccess({ attendees: action.attendees })),
                    catchError(error => of(AttendeesActions.joinActivityFailure({ error })))
                )
            )
        )
    )

    cancelJoiningActivity = createEffect(
        () => this.actions$.pipe(
            ofType(AttendeesActions.cancelJoiningActivity),
            switchMap((action) =>
                this.activityService.cancelJoiningActivity(action.activityId).pipe(
                    map((attendees:IAttendees) => AttendeesActions.cancelJoiningActivitySuccess({ attendeesId: attendees.id })),
                    catchError(error => of(AttendeesActions.cancelJoiningActivityFailure({ error })))
                )
            )
        )
    )



    listenSuccessAction$ = createEffect(
        () => this.actions$.pipe(
            ofType(...this.ATTENDEES_ACTIONS_SUCCESS),
            tap(() => {
                console.log("Load Attendees");
            })
        ), { dispatch: false }
    )

    listenFailureAction$ = createEffect(
        () => this.actions$.pipe(
            ofType(...this.ATTENDEES_ACTIONS_ERROR),
            tap(error => {
                console.log(error.error);
            })
        ), { dispatch: false }
    )
}


