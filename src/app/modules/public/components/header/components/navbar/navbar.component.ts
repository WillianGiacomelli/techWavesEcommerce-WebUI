import { Component, inject } from '@angular/core';
import { CartBehaviorService } from '../../../../state/cart.service';

@Component({
  selector: 'app-public-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public isMenuOpen = false;
  public isDropdownOpened = false;
  public cartService = inject(CartBehaviorService);

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(){
    this.isDropdownOpened = !this.isDropdownOpened;
  }

}
