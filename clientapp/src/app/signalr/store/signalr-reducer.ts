import { HubConnection } from '@microsoft/signalr';
import { createReducer, on } from '@ngrx/store';
import { SignalRActions } from './signalr-actions-types';




export interface SignalrState {
    connecting: boolean;
    connected: boolean;
    disconnecting: boolean;
    disconnected: boolean;
    reconnecting: boolean;
    error: any;

}


export const signalrInitialState: SignalrState = {
    connecting: false,
    connected: false,
    disconnecting: false,
    disconnected: false,
    reconnecting: false,
    error: null

}


export const signalrReducer = createReducer(
    signalrInitialState,
    on(SignalRActions.signalrActionConnecting,
        (state, action) => {
            return {
                ...state,
                connected: false,
                connecting: true,
                disconnecting: false,
                disconnected: false,
                reconnecting: false,
                error: null
            }
        }),
    on(SignalRActions.signalrActionConnected, (state, action) => {
        return {
            ...state,
            connected:true,
            connecting: false,
            disconnecting: false,
            disconnected: false,
            reconnecting: false,
            error: null
        }
    }),
    on(SignalRActions.signalrActionDisconnecting, (state, action) => {
        return {
            ...state,
            connected:false,
            connecting: false,
            disconnecting: true,
            disconnected: false,
            reconnecting: false,
            error: null
        }
    }),
    on(SignalRActions.signalrActionDisconnected, (state, action) => {
        return {
            ...state,
            connected:false,
            connecting: false,
            disconnecting: false,
            disconnected: true,
            reconnecting: false,
            error: null
        }
    }),

    on(SignalRActions.signalrActionReconnecting, (state, action) => {
        return {
            ...state,
            connected:false,
            connecting: false,
            disconnecting: false,
            disconnected: false,
            reconnecting: true,
            error: null
        }
    }),
    on(SignalRActions.signalrConnectFailure, (state, action) => {
        return {
            ...state,
            connected:false,
            connecting: false,
            disconnecting: false,
            disconnected: false,
            reconnecting: false,
            error: action.error
        }
    }),

)