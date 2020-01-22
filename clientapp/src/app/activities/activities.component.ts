import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Observable, ObservableLike } from 'rxjs';
import { IACtivity } from './store/IActivity';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectAllActivit, selectActivityLoading, selectActivityError, getActiivtyById } from './store/activity.selectors';


@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  model: NgbDateStruct;
  date:Date

  activities$:Observable<IACtivity[]>;
  loading$:Observable<boolean>;
  error$:Observable<any>;
  activity$:Observable<IACtivity>

  constructor(
    private calendar: NgbCalendar,
    private store:Store<AppState>,

    
    ) {
  }


  ngOnInit() {
    this.activities$=this.store.pipe(select(selectAllActivit));
    this.loading$=this.store.pipe(select(selectActivityLoading));
    this.error$=this.store.pipe(select(selectActivityError));

   
  }


  getDate($event){
    console.log(this.isoToLocaleFormat($event));
  }

  private  isoToLocaleFormat(date){
    const offsetMs = date.getTimezoneOffset() * 60 * 1000;
    const msLocal =  date.getTime() - offsetMs;
    const dateLocal = new Date(msLocal);
    const iso = dateLocal.toISOString();
    const isoLocal = iso.slice(0, 19);
    return isoLocal;
  }

}
