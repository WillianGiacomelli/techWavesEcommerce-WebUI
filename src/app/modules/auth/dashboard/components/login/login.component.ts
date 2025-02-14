import { Component, inject } from '@angular/core';
import { AuthBehaviorService } from '../../services/behavior/auth-behavior.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public authBehaviorService: AuthBehaviorService = inject(AuthBehaviorService);

  public changeActiveForm(active: 'login' | 'signUp' | 'forgotPass'){
    this.authBehaviorService.loginFormActivated.set(active);
  }
}
