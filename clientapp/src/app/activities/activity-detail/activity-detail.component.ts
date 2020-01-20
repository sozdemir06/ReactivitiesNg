import { Component, OnInit } from '@angular/core';
import { IACtivity, IAttendees } from '../store/IActivity';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { getActiivtyById, isHost, isGoing } from '../store/activity.selectors';
import * as AuthSelectors from "../../auth/store/auth-selectors";
import { v4 as uuid } from "uuid";
import { IUser } from 'src/app/auth/models/IUser';
import { AttendeesActions } from '../store/Attendees/attandees-actions-types';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {
  mode: boolean = false;
  activity$: Observable<IACtivity>;
  isHost$: Observable<boolean>;
  isGoing$: Observable<boolean>;
  activityRouterId: string | number;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    const activityId = this.route.snapshot.paramMap.get("id");
    if (activityId) {
      this.activityRouterId = activityId;
      this.activity$ = this.store.pipe(select(getActiivtyById(activityId)));
      this.isHost$ = this.store.pipe(select(isHost(activityId)));
      this.isGoing$ = this.store.pipe(select(isGoing(activityId)));
      this.activity$.subscribe(data => {
        if (!data) {
          this.router.navigateByUrl("/activities");
        }
      })
    } else {
      this.router.navigateByUrl("/activities");
    }

  }

  changeMode() {
    this.mode = !this.mode;
  }

  joinActivity(id: string | number) {
    const currentUser: Observable<IUser> = this.store.pipe(select(AuthSelectors.selectCurrentUser));
    currentUser.subscribe((user: IUser) => {
      if (user) {
        const attendees: IAttendees = {
          id: uuid(),
          displayName: user.displayName,
          userName: user.userName,
          isHost: false,
          image: null
        }

        this.store.dispatch(AttendeesActions.joinActivity({ attendees: attendees, activityId: id }));
      }
    })

  }

  cancelJoiningActivity(id: string) {
    this.store.dispatch(AttendeesActions.cancelJoiningActivity({ activityId: id }));

  }

}
