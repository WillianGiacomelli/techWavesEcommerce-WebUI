import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:"",
    component: DashboardComponent
  },
];

export const AuthRoutes = RouterModule.forChild(routes);
