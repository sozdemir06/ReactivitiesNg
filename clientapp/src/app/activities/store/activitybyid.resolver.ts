import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IACtivity } from './IActivity';

@Injectable({ providedIn: 'root' })
export class YourResolver implements Resolve<IACtivity> {
    constructor(){
        
    }
    resolve(route: ActivatedRouteSnapshot): Observable<IACtivity> | Promise<IACtivity> | IACtivity {
        return ;
    }
}