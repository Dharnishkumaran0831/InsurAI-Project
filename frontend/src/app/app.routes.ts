import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserDashboardComponent } from './dashboards/user/user-dashboard.component';
import { EmployeeDashboardComponent } from './dashboards/employee/employee-dashboard.component';
import { HrDashboardComponent } from './dashboards/hr/hr-dashboard.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent },

  { path: 'user', component: UserDashboardComponent },
  { path: 'employee', component: EmployeeDashboardComponent },
  { path: 'hr', component: HrDashboardComponent },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];


