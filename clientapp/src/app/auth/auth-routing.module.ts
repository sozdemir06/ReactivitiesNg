import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


export const authRotes:Routes=[
    {path:"login",component:LoginComponent},
    {path:"register",component:RegisterComponent}
]

@NgModule({
    imports: [
       RouterModule.forChild(authRotes)
    ],
    exports: [
        RouterModule
    ],
})
export class AuthRoutingModule { }
