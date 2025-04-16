import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard.component';
import { PublicRoutes } from './public.routing';
import { NavbarComponent } from './components/header/components/navbar/navbar.component';
import { HeaderComponent } from './components/header/component/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/component/body.component';
import { ProductComponent } from './components/body/components/product/product.component';
import { CartComponent } from './components/cart/component/cart.component';
import { SharedModule } from '../../shared/shared.module';
import { EmptyCartComponent } from './components/cart/components/empty-cart/empty-cart.component';
import { MainSectionComponent } from './components/header/components/main/main-section.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    ProductComponent,
    CartComponent,
    EmptyCartComponent,
    MainSectionComponent
  ],
  imports: [
    CommonModule,
    PublicRoutes,
    SharedModule,
],
})
export class PublicModule { }
