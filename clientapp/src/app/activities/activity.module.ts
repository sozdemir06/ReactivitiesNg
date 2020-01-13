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
import { AttendeeComponent } from './attendee/attendee.component';
import { attendeesReducer } from './store/Attendees/attendees-reducer';
import { AttendeesEffect } from './store/Attendees/attendees-effect';


@NgModule({
    declarations: [
        ActivitiesComponent,
        ActivityListComponent,
        ActivityDetailComponent,
        ActivityEditFormComponent,
        ActivityCreateFormComponent,
        AttendeeComponent
        
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ActivityRoutingModule,
        SharedModule,
        NgbDatepickerModule,
        StoreModule.forFeature("activity",{
            activities:activityReducer,
            attendees:attendeesReducer
        }),
        EffectsModule.forFeature([ActivityEffects,AttendeesEffect]),
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
        NgbTimepickerModule,
        AttendeeComponent
    ],

    providers: [
        ActivityResolver,
        ActivityService,

    ],
})
export class ActivityModule { }
