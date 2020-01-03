import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IACtivity } from '../store/IActivity';
import { ActivatedRoute, Router } from '@angular/router';
import { getActiivtyById, selectActivityError } from '../store/activity.selectors';
import { Update } from '@ngrx/entity';
import { ActivityActions } from '../store/activity-actions.types';

@Component({
  selector: 'app-activity-edit-form',
  templateUrl: './activity-edit-form.component.html',
  styleUrls: ['./activity-edit-form.component.css']
})
export class ActivityEditFormComponent implements OnInit {

  activityEditForm:FormGroup;
  actiivty$:Observable<IACtivity>;
  activity:IACtivity;
  error$:Observable<any>;

  constructor(
    private store:Store<AppState>,
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private router:Router

  ) { }

  ngOnInit() {
    const activityid=this.route.snapshot.paramMap.get("id");
    if(activityid){
      this.actiivty$=this.store.pipe(select(getActiivtyById(activityid)));
      this.actiivty$.subscribe(data=>{
         if(!data){
           this.router.navigateByUrl("/activities")
         }else{
           this.activity=data;
         }
      })
    }

    this.checkEditForm();
    this.activityEditForm.patchValue({...this.activity});
    this.error$=this.store.pipe(select(selectActivityError))
  }

  checkEditForm(){
    this.activityEditForm=this.fb.group({
      title:["",Validators.required],
      description:["",Validators.required],
      category:["",Validators.required],
      city:["",Validators.required],
      venue:["",Validators.required],
      date:["",Validators.required]
    })
  }
  submitEditForm(){
    const activity:IACtivity={
       ...this.activity,
       ...this.activityEditForm.value
    }

    const update:Update<IACtivity>={
      id:activity.id,
      changes:activity
    }
    
    this.store.dispatch(ActivityActions.updateActivity({update}))
  }

}
