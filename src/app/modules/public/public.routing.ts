import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';
import { CartComponent } from './components/cart/component/cart.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent
   },
   {
    path: 'cart',
    component: CartComponent
   }
];

export const PublicRoutes = RouterModule.forChild(routes);
