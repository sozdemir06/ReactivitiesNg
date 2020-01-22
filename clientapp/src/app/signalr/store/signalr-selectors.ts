import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignalrState } from './signalr-reducer';




export const selectSignalrState=createFeatureSelector<SignalrState>("signalr");


export const connecting=createSelector(
    selectSignalrState,
    state=>state.connecting
)

export const connected=createSelector(
    selectSignalrState,
    state=>state.connected
)

export const disconnecting=createSelector(
    selectSignalrState,
    state=>state.disconnecting
)

export const disconnected=createSelector(
    selectSignalrState,
    state=>state.disconnected
)

export const reconnecting=createSelector(
    selectSignalrState,
    state=>state.reconnecting
)

export const error=createSelector(
    selectSignalrState,
    state=>state.error
)