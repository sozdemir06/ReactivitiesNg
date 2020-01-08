import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import * as AuthSelectors from "../auth/store/auth-selectors";
import { tap, map, take, first, flatMap } from 'rxjs/operators';
import { IUser } from '../auth/models/IUser';
import { AuthActions } from '../auth/store/auth-actions.types';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private store:Store<AppState>,

    ){}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select(AuthSelectors.selectCurrentUser).pipe(
            first(),
            flatMap(user => {
            if(!user){
                return next.handle(req);
            }
              const authReq = !!user.token ? req.clone({
                setHeaders: { Authorization: 'Bearer ' + user.token },
              }) : req;
             
              return next.handle(authReq);
            }),
          );
    }
}


export const AuthInterceptors={
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
}