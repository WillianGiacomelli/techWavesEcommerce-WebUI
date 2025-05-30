import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutes } from './auth.routing';
import { DashboardComponent } from './dashboard/component/dashboard.component';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './dashboard/components/login/login.component';
import { SignUpComponent } from './dashboard/components/signUp/signUp.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DateOnlyDirectiveDirective } from '../../core/directives/DateOnlyDirective.directive';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutes,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers:[
    HttpClient,
  ]
})
export class AuthModule { }
