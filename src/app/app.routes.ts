import { Routes } from '@angular/router';
import { ChartsComponent } from './charts/charts.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ArgosComponent } from './argos/argos.component';
import { OmpDashboardComponent } from './omp-dashboard/omp-dashboard.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: ArgosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'omp-dashboard', component: OmpDashboardComponent },
];
