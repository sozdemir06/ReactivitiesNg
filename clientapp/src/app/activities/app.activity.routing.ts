import { NgModule } from '@angular/core';

import { Routes, RouterModule } from "@angular/router";
import { ActivitiesComponent } from './activities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityResolver } from "./store/activity.resolver";
import { ActivityCreateFormComponent } from './activity-create-form/activity-create-form.component';
import { ActivityEditFormComponent } from './activity-edit-form/activity-edit-form.component';


export const activityRoutes: Routes = [
    {
        path: "",
        component: ActivitiesComponent,
        resolve: {
            ActivityResolver
        }

    },
    { path: "create", component: ActivityCreateFormComponent },
    { path: "edit/:id", component: ActivityEditFormComponent },

    {
        path: ":id",
        component: ActivityDetailComponent,
    },
   

]

@NgModule({
    declarations: [

    ],
    imports: [
        RouterModule.forChild(activityRoutes)
    ],
    exports: [
        RouterModule
    ],

    providers: [],
})
export class ActivityRoutingModule { }
