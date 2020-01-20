import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import * as UploadSelectors from "./store/upload-selectors";
import { UploadActions } from './store/upload-action-types';
import { ProfileActions } from '../profiles/store/profile-actions-types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  completed$: Observable<boolean>;
  progress$: Observable<number>;
  error$: Observable<any>;
  getBody$:Observable<any>;
  
  isInProgress$: Observable<boolean>;
  isReady$: Observable<boolean>;
  hasFailed$: Observable<boolean>;
  constructor(
    private store$:Store<AppState>
  ) { }

  ngOnInit() {

    this.completed$=this.store$.pipe(select(UploadSelectors.getCompleted));
    this.progress$=this.store$.pipe(select(UploadSelectors.getProgress));
    this.error$=this.store$.pipe(select(UploadSelectors.getError));
    this.isInProgress$=this.store$.pipe(select(UploadSelectors.getInProgress));
    this.isReady$=this.store$.pipe(select(UploadSelectors.getReady));
    this.hasFailed$=this.store$.pipe(select(UploadSelectors.getFailed));
    this.getBody$=this.store$.pipe(select(UploadSelectors.getResult));

    this.getBody$.subscribe(data=>{
      if(data){
        this.store$.dispatch(ProfileActions.addNewProfilePhoto({image:data}));
      }
     
    })
  }

  uploadFile(event: any) {
    const files: FileList = event.target.files;
    const file = files.item(0);

    this.store$.dispatch(
      UploadActions.UploadRequestAction({
        file
      })
    );

    // clear the input form
    event.srcElement.value = null;
  }

  resetUpload() {
    this.store$.dispatch(UploadActions.UploadResetAction());
  }

  cancelUpload() {
    this.store$.dispatch(UploadActions.UploadResetAction());
  }

}
