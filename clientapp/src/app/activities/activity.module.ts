import { NgModule } from '@angular/core';
import { ActivitiesComponent } from './activities.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityRoutingModule } from './app.activity.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbDatepickerModule, NgbTimepickerModule} from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { activityReducer } from './store/activity.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ActivityResolver } from './store/activity.resolver';
import { ActivityEffects } from './store/activity-effects';
import { ActivityService } from './store/activity-service';
import { ActivityEditFormComponent } from './activity-edit-form/activity-edit-form.component';
import { ActivityCreateFormComponent } from './activity-create-form/activity-create-form.component';


@NgModule({
    declarations: [
        ActivitiesComponent,
        ActivityListComponent,
        ActivityDetailComponent,
        ActivityEditFormComponent,
        ActivityCreateFormComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ActivityRoutingModule,
        SharedModule,
        NgbDatepickerModule,
        StoreModule.forFeature("activities",activityReducer),
        EffectsModule.forFeature([ActivityEffects]),
        NgbDatepickerModule,
        NgbTimepickerModule
        

    ],
    exports: [
        ActivitiesComponent,
        ActivityListComponent,
        ActivityDetailComponent,
        NgbDatepickerModule,
        ActivityEditFormComponent,
        ActivityCreateFormComponent,
        NgbDatepickerModule,
        NgbTimepickerModule
    ],

    providers: [
        ActivityResolver,
        ActivityService,

    ],
})
export class ActivityModule { }
