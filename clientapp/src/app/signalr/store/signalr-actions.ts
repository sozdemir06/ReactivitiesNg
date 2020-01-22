import { createAction, props } from '@ngrx/store';
import { HubConnection} from "@microsoft/signalr";


export const signalrActionConnectionStart=createAction(
    "[SignalR Conn Start] Start"
)

export const signalrActionConnected=createAction(
    "[SignalR Conn Success] Success",
   

)

export const signalrActionConnecting=createAction(
    "[SignalR Conn Reconn] Reconnecting"
)

export const signalrActionDisconnecting=createAction(
    "[SignalR Conn Reconn] Reconnecting"
)

export const signalrActionDisconnected=createAction(
    "[SignalR Conn Reconn] Reconnecting"
)
export const signalrActionReconnecting=createAction(
    "[SignalR Conn Reconn] Reconnecting"
)


export const signalrConnectFailure=createAction(
    "[SignalR Conn Failure] Fialure",
    props<{error:any}>()
)