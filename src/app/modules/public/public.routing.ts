import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './components/body/component/body.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/component/cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    pathMatch:"prefix",
    children:[
      {
        path:"",
        component: BodyComponent,
      },
      {
        path:"product/:id",
        component: ProductDetailComponent
      }
    ]
   },
   {
    path: 'cart',
    component: CartComponent
   }
];

export const PublicRoutes = RouterModule.forChild(routes);
