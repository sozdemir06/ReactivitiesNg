import { NgModule, ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/auth-effects';
import { AuthService } from './services/auth-service';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {path:"login",component:LoginComponent},
            {path:"register",component:RegisterComponent},
        ]),
        StoreModule.forFeature("auth",authReducer),
        EffectsModule.forFeature([AuthEffect])
        
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ],
   
})
export class AuthModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
                
            ]
        }
    }
}
