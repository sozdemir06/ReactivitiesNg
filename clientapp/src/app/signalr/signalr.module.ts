import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignalrComponent } from './signalr.component';
import { SignalRService } from './signalr-service';
import { StoreModule } from '@ngrx/store';
import { signalrReducer } from './store/signalr-reducer';
import { EffectsModule } from '@ngrx/effects';
import { SignalREffect } from './store/signalr-effects';



@NgModule({
  declarations: [
    SignalrComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature("signalr",signalrReducer),
    EffectsModule.forFeature([SignalREffect])
  ],
  exports:[
    SignalrComponent
  ],
  providers:[
    SignalRService
  ]
})
export class SignalrModule { }
