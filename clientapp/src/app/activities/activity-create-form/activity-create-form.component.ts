import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/reducers';
import { Store, select } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivityActions } from '../store/activity-actions.types';
import { IACtivity } from '../store/IActivity';
import { v4 as uuid} from "uuid";
import { Observable } from 'rxjs';
import { selectActivityError } from '../store/activity.selectors';

@Component({
  selector: 'app-activity-create-form',
  templateUrl: './activity-create-form.component.html',
  styleUrls: ['./activity-create-form.component.css']
})
export class ActivityCreateFormComponent implements OnInit {
model:Date=new Date();
time = {hour: 13, minute: 30};

activityCreateForm:FormGroup;
activity:IACtivity;
error$:Observable<any>;

  constructor(
    private store:Store<AppState>,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    this.checkActivityCreateForm();
    this.error$=this.store.pipe(select(selectActivityError));
  }

  checkActivityCreateForm(){
    this.activityCreateForm=this.fb.group({
      title:["",Validators.required],
      description:["",Validators.required],
      category:["",Validators.required],
      city:["",Validators.required],
      venue:["",Validators.required],
      date:["",Validators.required]
    })
  }

  submitCreateForm(){
   if(this.activityCreateForm.valid){
     const activity:IACtivity={
       ...this.activity,
       ...this.activityCreateForm.value,
       id:uuid()
     }

     this.store.dispatch(ActivityActions.createActitivity({activity}))
   }
  }

}
