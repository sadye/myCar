import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path: "Events", component: EventPageComponent},
  {path: "Dashboard", component: DashboardPageComponent},
  {path: "", component: LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
