import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ActivityActions } from './activity-actions.types';
import { concatMap, map, catchError, switchMap, tap, mergeMap } from 'rxjs/operators';
import { ActivityService } from './activity-service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { IACtivity } from './IActivity';

@Injectable({ providedIn: 'root' })
export class ActivityEffects {
    constructor(
        private actions$: Actions,
        private acticityService: ActivityService,
        private router: Router
    ) { }

    ACTIVITY_ACTIONS_ERROR=[
        ActivityActions.createActitivityError,
        ActivityActions.loadActivityFailure,
        ActivityActions.updateActivityErrro,
        ActivityActions.loadMoreFailed
    ];

    ACTIVITY_ACTIONS_SUCCESS=[
        ActivityActions.createActitivitySuccess,
        ActivityActions.loadedActivitySuccess,
        ActivityActions.updateActivitySuccess,
        ActivityActions.loadMoreSuccess
    ]

    loadAllActivity$ = createEffect(
        () => this.actions$.pipe(
            ofType(ActivityActions.loadActivity),
            concatMap(action => this.acticityService.getallActivity()),
            map(activities => ActivityActions.loadedActivitySuccess({activitiesEnvelope:activities })),
            catchError(error => of(ActivityActions.loadActivityFailure({ error })))
        )
    )

  
    createActivity$ = createEffect(
        () => this.actions$.pipe(
            ofType(ActivityActions.createActitivity),
            switchMap((action) =>
                this.acticityService.addNew(action.activity).pipe(
                    map((activity: IACtivity) => ActivityActions.createActitivitySuccess({ activity })),
                    catchError(error => of(ActivityActions.createActitivityError({ error })))
                )
            )
        )
    )

    updateActivity$ = createEffect(
        () => this.actions$.pipe(
            ofType(ActivityActions.updateActivity),
            switchMap(({ update }) =>
                this.acticityService.updateActivity(update.id, update).pipe(
                    map(() => ActivityActions.updateActivitySuccess({ update })),
                    catchError(error => of(ActivityActions.updateActivityErrro({ error })))
                )
            )

        )
    )

    //Laod More Effect
    loadMoreActivity=createEffect(
        ()=>this.actions$.pipe(
            ofType(ActivityActions.loadMoreStart),
            switchMap(({limit,page})=>
                this.acticityService.getallActivity(limit,page).pipe(
                    map(activityEnevelope=>ActivityActions.loadMoreSuccess({activitiesEnvelope:activityEnevelope})),
                    catchError(error=>of(ActivityActions.loadMoreFailed({error})))
                )
            )
        )
    )


    //listener for all activity crud error                
    activityError$ = createEffect(
        () => this.actions$.pipe(
            ofType(...this.ACTIVITY_ACTIONS_ERROR),
            tap(error => {
                console.log(error.error)
            })
        ), { dispatch: false }
    )

    //listener for all activity crud success
    activitySuccess$=createEffect(
        ()=>this.actions$.pipe(
            ofType(...this.ACTIVITY_ACTIONS_SUCCESS),
            tap(()=>{
                console.log("Success")
            })
        ),{dispatch:false}
    )




}