import { Component, inject, OnDestroy } from '@angular/core';
import { AuthBehaviorService } from '../../services/behavior/auth-behavior.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy{
  public authBehaviorService: AuthBehaviorService = inject(AuthBehaviorService);

  ngOnDestroy(): void {
    this.authBehaviorService.loginFormActivated.set('login');
  }
}
