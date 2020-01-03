import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ErrorComponent } from './error/error.component';
import { LoadingComponent } from './loading/loading.component';




@NgModule({
  declarations: [
    ErrorComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    NgbAlertModule,

  ],
  exports: [
    CommonModule,
    NgbAlertModule,
    ErrorComponent,
    LoadingComponent

  ],

  providers: [],
})
export class SharedModule { }
