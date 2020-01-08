import { Component, OnInit } from '@angular/core';
import { IACtivity } from '../store/IActivity';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getActiivtyById, isHost, isGoing } from '../store/activity.selectors';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
  mode:boolean=false;
  activity$:Observable<IACtivity>;
  isHost$:Observable<boolean>;
  isGoing$:Observable<boolean>;

  constructor(
    private route:ActivatedRoute,
    private store:Store<AppState>,
    private router:Router
  ) { }

  ngOnInit() {
    const activityId=this.route.snapshot.paramMap.get("id");
    if(activityId){
      this.activity$=this.store.pipe(select(getActiivtyById(activityId)));
      this.isHost$=this.store.pipe(select(isHost(activityId)));
      this.isGoing$=this.store.pipe(select(isGoing(activityId)));
      this.activity$.subscribe(data=>{
        if(!data){
          this.router.navigateByUrl("/activities");
        }
      })
    }else{
      this.router.navigateByUrl("/activities");
    }

  }

  changeMode(){
    this.mode=!this.mode;
  }

}
