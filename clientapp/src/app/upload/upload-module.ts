import { NgModule } from '@angular/core';
import { UploadComponent } from './upload.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { uploadReducer } from './store/upload-reducer';
import { EffectsModule } from '@ngrx/effects';
import { UploadEffect } from './store/upload-effect';
import { UploadService } from './upload-service';



@NgModule({
    declarations: [
        UploadComponent
    ],
    imports: [
        CommonModule,
        StoreModule.forFeature("upload",uploadReducer),
        EffectsModule.forFeature([UploadEffect])
        
    ],
    exports: [
        UploadComponent
    ],
    providers: [
        UploadService
    ],
})
export class UploadModule { }
