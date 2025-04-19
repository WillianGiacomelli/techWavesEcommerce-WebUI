import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() isCartScreen: boolean = false;
  @Input() isLoginScreenCameFromCartNotLoggedIn: boolean = false;
}
