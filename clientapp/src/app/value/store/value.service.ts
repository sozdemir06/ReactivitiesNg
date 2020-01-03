import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IValue } from './model';
import { environment } from 'src/environments/environment';



@Injectable()
export class ValueService{
apiUrl:string=environment.apiUrl;

    constructor(
        private http:HttpClient
    ){}


    getAllValues():Observable<IValue[]>{
        return this.http.get<IValue[]>(this.apiUrl+"values");
    }
}