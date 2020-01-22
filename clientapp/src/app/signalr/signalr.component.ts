import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import * as SignalRSelectors from "./store/signalr-selectors";
import { HubConnection } from '@microsoft/signalr';
import { SignalRActions } from './store/signalr-actions-types';

@Component({
  selector: 'app-signalr',
  templateUrl: './signalr.component.html',
  styleUrls: ['./signalr.component.css']
})
export class SignalrComponent implements OnInit {
connected$:Observable<boolean>;
connecting$:Observable<boolean>;
disconnecting$:Observable<boolean>;
disconnected$:Observable<boolean>;
reconnecting$:Observable<boolean>;

  constructor(
    private store:Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(SignalRActions.signalrActionConnectionStart());

    this.connected$=this.store.pipe(select(SignalRSelectors.connected));
    this.connecting$=this.store.pipe(select(SignalRSelectors.connecting));
    this.disconnecting$=this.store.pipe(select(SignalRSelectors.disconnecting));
    this.disconnected$=this.store.pipe(select(SignalRSelectors.disconnected));
    this.reconnecting$=this.store.pipe(select(SignalRSelectors.reconnecting));

  }

}
