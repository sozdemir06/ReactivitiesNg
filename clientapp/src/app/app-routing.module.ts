import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path:"",redirectTo:"activities",pathMatch:"full"},
  {
    path:"values",
    loadChildren:()=>import("./value/value.module").then(m=>m.ValueModule)
  },
  {
    path:"activities",
    loadChildren:()=>import("./activities/activity.module").then(m=>m.ActivityModule)
  },

  {path:"**",redirectTo:"",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
