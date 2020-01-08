

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AuthService {
apiUrl=environment.apiUrl;


    constructor(private httpClient: HttpClient) { }

    login(model:any):Observable<IUser>{
        return this.httpClient.post<IUser>(this.apiUrl+"user/login",model);
    }


    
}