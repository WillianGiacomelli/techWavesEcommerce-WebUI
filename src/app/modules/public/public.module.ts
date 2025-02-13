import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard.component';
import { PublicRoutes } from './public.routing';
import { NavbarComponent } from './components/header/components/navbar/navbar.component';
import { HeaderComponent } from './components/header/component/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/component/body.component';
import { ProductComponent } from './components/body/components/product/product.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    PublicRoutes
  ]
})
export class PublicModule { }
