import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/component/dashboard.component';

const routes: Routes = [
  {
    path:"",
    component: DashboardComponent
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
