import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './component/dashboard.component';
import { PublicRoutes } from './public.routing';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    PublicRoutes
  ]
})
export class PublicModule { }
