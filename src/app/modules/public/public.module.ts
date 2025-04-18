import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard.component';
import { PublicRoutes } from './public.routing';
import { NavbarComponent } from './components/header/components/navbar/navbar.component';
import { HeaderComponent } from './components/header/component/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/component/body.component';
import { CartComponent } from './components/cart/component/cart.component';
import { SharedModule } from '../../shared/shared.module';
import { EmptyCartComponent } from './components/cart/components/empty-cart/empty-cart.component';
import { MainSectionComponent } from './components/header/components/main/main-section.component';
import { ProductCardComponent } from './components/body/components/product/product-card.component';
import { CartBehaviorService } from './state/cart.service';
import { ProducBehaviorService } from './state/product.service';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    ProductCardComponent,
    CartComponent,
    EmptyCartComponent,
    MainSectionComponent
  ],
  imports: [
    CommonModule,
    PublicRoutes,
    SharedModule,
  ],
  providers: [
    CartBehaviorService,
    ProducBehaviorService
  ]
})
export class PublicModule { }
