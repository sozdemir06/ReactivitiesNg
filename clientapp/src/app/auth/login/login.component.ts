import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { Observable } from 'rxjs';

import * as AuthSelectors from "../store/auth-selectors";
import { AuthActions } from '../store/auth-actions.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loading$:Observable<boolean>;
  error$:Observable<any>;

  constructor(
    private store:Store<AppState>,
    private fb:FormBuilder,
  ) { }

  ngOnInit() {
    this.checkLoginForm();
    this.loading$=this.store.pipe(select(AuthSelectors.loading));
    this.error$=this.store.pipe(select(AuthSelectors.error));
  }

  checkLoginForm(){
    this.loginForm=this.fb.group({
      email:["",[Validators.required,Validators.email]],
      password:["",Validators.required]
    })
  }
  onSubmit(){
    if(this.loginForm.valid){
      this.store.dispatch(AuthActions.login(this.loginForm.value));
    }
  }

}
