import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: "", redirectTo: "activities", pathMatch: "full" },
  {
    path: "values",
    loadChildren: () => import("./value/value.module").then(m => m.ValueModule)
  },
  {
    path: "activities",
    loadChildren: () => import("./activities/activity.module").then(m => m.ActivityModule)
  },

  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule)
  },

  {
    path: "profiles",
    loadChildren: () => import("./profiles/profile.module").then(m => m.ProfileModule)
  },


  { path: "**", redirectTo: "", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
