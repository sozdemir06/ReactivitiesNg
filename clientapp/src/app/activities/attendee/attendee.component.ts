import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IAttendees } from '../store/IActivity';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AttendeesActions } from '../store/Attendees/attandees-actions-types';
import * as AttendeeSelectors from "../../activities/store/Attendees/attendees-selectors";

@Component({
  selector: 'app-attendee',
  templateUrl: './attendee.component.html',
  styleUrls: ['./attendee.component.css']
})
export class AttendeeComponent implements OnInit,AfterViewInit {
  @Input() activityId:string | number;

  attendees$:Observable<IAttendees[]>;
  loading$:Observable<boolean>;
  error$:Observable<boolean>;
  isExist$:Observable<boolean>;
  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(AttendeesActions.loadAttendees({activityId:this.activityId}));
    this.attendees$=this.store.pipe(select(AttendeeSelectors.selectAllAttendees));
    this.loading$=this.store.pipe(select(AttendeeSelectors.loading));
    this.error$=this.store.pipe(select(AttendeeSelectors.error));
  }

  ngAfterViewInit(){
   
  }

}
