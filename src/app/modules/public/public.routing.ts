import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent
   },
];

export const PublicRoutes = RouterModule.forChild(routes);
