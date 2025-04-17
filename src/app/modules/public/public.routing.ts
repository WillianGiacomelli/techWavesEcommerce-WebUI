import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';
import { CartComponent } from './components/cart/component/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { BodyComponent } from './components/body/component/body.component';

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
