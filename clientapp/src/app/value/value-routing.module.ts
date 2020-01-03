import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValueComponent } from './value.component';
import { ValueResolver } from './store/values.resolver';

const routes: Routes = [
    {
        path:"",
        component:ValueComponent,
        resolve:{
            values:ValueResolver
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class ValueRoutingModule { }