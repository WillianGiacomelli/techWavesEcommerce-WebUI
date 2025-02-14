import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routing';
import { DashboardComponent } from './dashboard/component/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './dashboard/components/login/login.component';
import { SignUpComponent } from './dashboard/components/signUp/signUp.component';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutes
  ]
})
export class AuthModule { }
