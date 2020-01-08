

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { AuthActions } from './auth-actions.types';
import { switchMap, timeoutWith, map, catchError, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth-service';
import { IUser } from '../models/IUser';
import { of } from 'rxjs';
import * as jwt_decode from "jwt-decode";
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { clearTimeout } from 'timers';

@Injectable({ providedIn: 'root' })
export class AuthEffect {
    tokenExpire: any;
    constructor(
        private actions$: Actions,
        private route: Router,
        private authService: AuthService,
        private store:Store<AppState>
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

    //listen loginSuccess action...
    loginSuccess$ = createEffect(
        () => this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(user => {
                if(this.tokenExpire){
                    window.clearTimeout(this.tokenExpire);
                 }
                if (user) {
                    const token = user.user.token;
                    const decodedToken = jwt_decode(token);
                    localStorage.setItem("token", token);
                    localStorage.setItem("user",JSON.stringify(user.user));
                    this.store.dispatch(AuthActions.decodeToken({decodedToken}))
                    this.route.navigateByUrl("/activities");
                    const now=Date.now();
                    const expireTime=decodedToken.exp*1000-now;
                    
                    this.tokenExpire = setTimeout(() => {
                        this.store.dispatch(AuthActions.logout());
                    },+expireTime)

                }
            }),

        ), { dispatch: false }
    )

    logOut$=createEffect(
        ()=>this.actions$.pipe(
            ofType(AuthActions.logout),
            tap(()=>{
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                if(this.tokenExpire){
                   window.clearTimeout(this.tokenExpire);
                }
                this.route.navigateByUrl("/auth/login")
            })
        ),{dispatch:false}
        )
}