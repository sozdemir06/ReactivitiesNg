import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IACtivity, IAttendees, IActivityEnvelope } from './IActivity';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ActivityService {
apiUrl:string=environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) { }


    getallActivity(limit?:any,page?:any):Observable<IActivityEnvelope>{
        const offset=page?page*limit:0;
        if(!limit){
            limit=2;
        }
        const params=new HttpParams()
                    .set("limit",`${limit}`)
                    .set("offset",`${offset}`)

        return this.httpClient.get<IActivityEnvelope>(this.apiUrl+"activities",{params});
    }

    addNew(activity:IACtivity):Observable<IACtivity>{
        return this.httpClient.post<IACtivity>(this.apiUrl+"activities",activity);
    }

    updateActivity(id:string | number,model:any):Observable<IACtivity>{
        return this.httpClient.put<IACtivity>(this.apiUrl+"activities/"+id,model.changes);
    }

    getactivityAttendees(activityId:string | number):Observable<IAttendees[]>{
        return this.httpClient.get<IAttendees[]>(this.apiUrl+"activities/attendees/"+activityId);
    }

    joinActivity(activityId:string | number):Observable<IAttendees>{
        return this.httpClient.post<IAttendees>(this.apiUrl+"activities/attend/"+activityId,{});
    }

    cancelJoiningActivity(activityId:string):Observable<IAttendees>{
        return this.httpClient.delete<IAttendees>(this.apiUrl+"activities/attend/"+activityId);
    }
    
}