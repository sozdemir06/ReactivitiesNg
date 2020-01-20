

import { Injectable } from '@angular/core';
import { ProfileService } from '../services/profile-service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { ProfileActions } from './profile-actions-types';
import { switchMap, map, catchError } from 'rxjs/operators';
import { IProfile } from '../models/IProfile';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileEffect {
    constructor(
        private profileService: ProfileService,
        private actions$: Actions
    ) { }


    loadProfile = createEffect(
        () => this.actions$.pipe(
            ofType(ProfileActions.loadProfileStart),
            switchMap(action =>
                this.profileService.getProfileByName(action.username).pipe(
                    map((profile: IProfile) => ProfileActions.loadProfileSuccess({ profile })),
                    catchError(error => of(ProfileActions.loadProfileDailure({ error })))
                )

            )
        )
    )

}