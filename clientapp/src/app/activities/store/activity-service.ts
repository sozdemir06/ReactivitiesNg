import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IACtivity, IAttendees } from './IActivity';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ActivityService {
apiUrl:string=environment.apiUrl;

    constructor(
        private httpClient: HttpClient
    ) { }


    getallActivity():Observable<IACtivity[]>{
        return this.httpClient.get<IACtivity[]>(this.apiUrl+"activities");
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