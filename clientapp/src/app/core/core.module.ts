import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { NgbCollapseModule, NgbDropdownModule, NgbDateAdapter, NgbDateNativeAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { ErrorInterceptorProvide } from './error-interceptor';
import { CommonModule } from '@angular/common';
import { AuthInterceptors } from './auth-interceptors';
import { SignalrModule } from '../signalr/signalr.module';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        NgbCollapseModule,
        NgbDropdownModule,
        RouterModule,
        SignalrModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        NgbCollapseModule,
        NgbDropdownModule,


    ],
    providers: [
        { provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter },
        ErrorInterceptorProvide,
        AuthInterceptors
    ]
})
export class CoreModule { }


