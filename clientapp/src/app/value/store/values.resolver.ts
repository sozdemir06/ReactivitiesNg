import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Observable } from "rxjs";

import { Store, select } from "@ngrx/store";

import { tap, first, finalize, filter } from "rxjs/operators";
import { AppState } from 'src/app/reducers';
import { areValuesLoaded } from './values.selectors';
import { ValueActions } from './value-action.types';



@Injectable({ providedIn: "root" })
export class ValueResolver implements Resolve<any> {
 loading=false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot

  ): Observable<any> {
    return this.store.pipe(
      select(areValuesLoaded),
      tap(coursesLoaded => {
          if(!this.loading && !coursesLoaded){
              this.loading=true;
            this.store.dispatch(ValueActions.loadAllvalues());
          }
       
      }),
      //filter(courseLoaded=>courseLoaded),
      first(),
      finalize(()=>(this.loading=false))
    );
  }
}