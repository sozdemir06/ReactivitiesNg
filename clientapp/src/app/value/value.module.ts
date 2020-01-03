import { NgModule } from '@angular/core';

import { ValueComponent } from "./value.component";
import { ValueRoutingModule } from './value-routing.module';
import { ValueResolver } from './store/values.resolver';
import { ValueService } from './store/value.service';
import { EffectsModule } from '@ngrx/effects';
import { ValueEffects } from './store/value.effects';
import { StoreModule } from '@ngrx/store';
import { valuesReducer } from './store/values.reducers';
import { ValueListComponent } from './value-list/value-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        ValueComponent,
        ValueListComponent
    ],
    imports: [
        SharedModule,
        ValueRoutingModule,
        StoreModule.forFeature("values", valuesReducer),
        EffectsModule.forFeature([ValueEffects]),

    ],
    exports: [
        ValueComponent,
        ValueListComponent
    ],
    providers: [
        ValueResolver,
        ValueService
    ],
})
export class ValueModule { }
