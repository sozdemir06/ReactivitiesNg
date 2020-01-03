import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { SharedModule } from './shared/shared.module';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';



@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      AuthComponent,


   ],
   imports: [
      BrowserModule,
      AppRoutingModule,

      HttpClientModule,
      CoreModule,
      SharedModule,
      AuthModule.forRoot(),
      StoreModule.forRoot(reducers, {
         metaReducers,
         runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true
         }
      }),
      StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
      EffectsModule.forRoot([AppEffects]),
      


   ],
   providers: [],
   bootstrap: [AppComponent]
})
export class AppModule { }
