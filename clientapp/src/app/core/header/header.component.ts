import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import * as AuthSelectors from "../../auth/store/auth-selectors";
import { AuthActions } from 'src/app/auth/store/auth-actions.types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isMenuCollapsed:boolean=false; 
  isLoggedIn$:Observable<boolean>;
  isLoggedOut$:Observable<boolean>;

  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit() {

    this.isLoggedIn$=this.store.pipe(select(AuthSelectors.isLoggedIn));
    this.isLoggedOut$=this.store.pipe(select(AuthSelectors.isLoggedOut));

    
  }

  logOut(){
    this.store.dispatch(AuthActions.logout());
  }

}
