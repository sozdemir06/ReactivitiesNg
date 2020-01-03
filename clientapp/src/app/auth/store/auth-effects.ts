

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthActions } from './auth-actions.types';
import { switchMap, timeoutWith, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { IUser } from '../models/IUser';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthEffect {

    constructor(
        private actions$: Actions,
        private route: Router,
        private authService: AuthService
    ) { }


    login$ = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.login),
            switchMap((model: any) =>
                this.authService.login(model).pipe(
                    map((user: IUser) => AuthActions.loginSuccess({ user })),
                    catchError(error => of(AuthActions.loginFailure({ error })))
                )

            )
        )
    )

    loginSuccess$=createEffect(
        ()=>this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(user=>{
                
            })
        ),{dispatch:false}
    )
}