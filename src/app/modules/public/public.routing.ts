import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard.component';
import { CartComponent } from './components/cart/component/cart.component';
import { ProductComponent } from './components/product/product.component';
import { BodyComponent } from './components/body/component/body.component';

const routes: Routes = [
  {
    path:'',
    component: DashboardComponent,
    children:[
      {
        path:"",
        component: BodyComponent
      },
      {
        path:"product",
        component: ProductComponent
      }
    ]
   },
   {
    path: 'cart',
    component: CartComponent
   }
];

export const PublicRoutes = RouterModule.forChild(routes);
