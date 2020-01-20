import { NgModule } from '@angular/core';
import { ProfilesComponent } from './profiles.component';
import { ProfileHeaderComponent } from './profile-header/profile-header.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgbTabsetModule} from "@ng-bootstrap/ng-bootstrap";
import { StoreModule } from '@ngrx/store';
import { profileReducer } from './store/profile-reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffect } from './store/profile-effect';
import { ProfileService } from './services/profile-service';
import { UploadModule } from '../upload/upload-module';

export const profileRoutes:Routes=[
    {path:":username",component:ProfilesComponent}
]

@NgModule({
    declarations: [
        ProfilesComponent,
        ProfileHeaderComponent,
        ProfileContentComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(profileRoutes),
        NgbTabsetModule,
        StoreModule.forFeature("profile",profileReducer),
        EffectsModule.forFeature([ProfileEffect]),
        UploadModule
    ],
    exports: [
        RouterModule,
        ProfilesComponent,
        ProfileHeaderComponent,
        ProfileContentComponent,
        NgbTabsetModule,
        UploadModule

    ],
   
    providers: [
        ProfileService
    ],
})
export class ProfileModule { }
