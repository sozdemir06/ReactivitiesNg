import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { Observable } from 'rxjs';
import { IProfile } from './models/IProfile';
import { ActivatedRoute } from '@angular/router';
import { ProfileActions } from './store/profile-actions-types';
import * as ProfileSelectors from "./store/profile-selectors";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  error$:Observable<any>;
  loading$:Observable<boolean>;
  profile$:Observable<IProfile>;
  constructor(
    private store$:Store<AppState>,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    const userNameFromRoute=this.route.snapshot.paramMap.get("username");
    this.store$.dispatch(ProfileActions.loadProfileStart({username:userNameFromRoute}));

    this.loading$=this.store$.pipe(select(ProfileSelectors.profileLoading));
    this.error$=this.store$.pipe(select(ProfileSelectors.profileError));
    this.profile$=this.store$.pipe(select(ProfileSelectors.selectProfile));
    
  
  }

}
