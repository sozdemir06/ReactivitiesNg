

import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({providedIn: 'root'})
export class UploadService {
    apiUrl=environment.apiUrl;

    constructor(
        private httpClient: HttpClient
        
        ) { }


    uploadFile(file:File):Observable<HttpEvent<{}>>{
        const formData=new FormData();
        formData.append("file",file,file.name);

        const options = {
            reportProgress: true,
            observe:"events"
          };

          const req=new HttpRequest(
              "POST",
              `${this.apiUrl}user/uploadphoto`,
              formData,
              options
          )

          return this.httpClient.request(req);
    }
    
}