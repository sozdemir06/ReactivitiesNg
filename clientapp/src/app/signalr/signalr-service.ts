

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HubConnection, LogLevel, HubConnectionState } from '@microsoft/signalr';
import * as SignalR from "@microsoft/signalr";
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { SignalRActions } from './store/signalr-actions-types';

@Injectable({ providedIn: 'root' })
export class SignalRService {
    apiUrl = environment.apiUrl;
    hubConnection: HubConnection | null;



    constructor(
        private httpClient: HttpClient,
        private store:Store<AppState>

    ) {

    }


    connectionStart() {
        this.hubConnection = new SignalR.HubConnectionBuilder()
            .withUrl("http://localhost:5000/chat", {
                accessTokenFactory: () => localStorage.getItem("token")
            }).withAutomaticReconnect()
            .configureLogging(LogLevel.Information).build();

        this.hubConnection.start().then(()=>{
            this.store.dispatch(SignalRActions.signalrActionConnected())
        }).catch(error=>{
            this.store.dispatch(SignalRActions.signalrActionDisconnected());
        });

        this.hubConnection.onreconnecting((error)=>{
            this.store.dispatch(SignalRActions.signalrActionReconnecting());
            console.assert(this.hubConnection.state === HubConnectionState.Reconnecting);
        });

        this.hubConnection.onreconnected((connectionId)=>{
            this.store.dispatch(SignalRActions.signalrActionConnected())
            console.assert(this.hubConnection.state === HubConnectionState.Connected);
        })

        this.hubConnection.onclose((error)=>{
            this.store.dispatch(SignalRActions.signalrActionDisconnected());
            //console.assert(this.hubConnection.state === HubConnectionState.Disconnected);
        })



    }



}