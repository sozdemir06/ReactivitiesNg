

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProfile } from '../models/IProfile';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProfileService {
    apiUrl=environment.apiUrl;
    constructor(
        private httpClient: HttpClient
        ) { }

    
    getProfileByName(userName:string):Observable<IProfile>{
        return this.httpClient.get<IProfile>(this.apiUrl+"profiles/"+userName);
    }
    
}