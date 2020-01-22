


import { Injectable } from '@angular/core';
import { SignalRService } from '../signalr-service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SignalRActions } from './signalr-actions-types';
import { catchError,  tap,} from 'rxjs/operators';

import { of } from 'rxjs';
import { HubConnection, HubConnectionState} from '@microsoft/signalr';

@Injectable({ providedIn: 'root' })

export class SignalREffect {

    constructor(
        private signalrService: SignalRService,
        private actions$: Actions
    ) { }


    signalInit$ = createEffect(
        () => this.actions$.pipe(
            ofType(SignalRActions.signalrActionConnectionStart),
            tap(() => this.signalrService.connectionStart()),
            catchError(error => of(SignalRActions.signalrConnectFailure({ error })))
        ),{dispatch:false}
    )




    // private getActionFromHubConnection(event:HubConnection) {
    //     console.log(event.state)
    //     switch (event.state) {
           
    //         case HubConnectionState.Connecting:{
    //             return SignalRActions.signalrActionConnecting();
    //         }

    //         case HubConnectionState.Connected:{
    //             return SignalRActions.signalrActionConnected();
    //         }
    //         case HubConnectionState.Disconnecting:{
    //             return SignalRActions.signalrActionDisconnecting();
    //         }
    //         case HubConnectionState.Disconnected:{
    //             return SignalRActions.signalrActionDisconnected();
    //         }

    //         case HubConnectionState.Reconnecting:{
    //             return SignalRActions.signalrActionReconnecting();
    //         }

    //         default: {
    //             return SignalRActions.signalrConnectFailure({
    //                 error: `Unknown Event: ${JSON.stringify(event)}`
    //             });
    //         }

    //     }

    // }



}