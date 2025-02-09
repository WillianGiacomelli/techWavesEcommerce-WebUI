import { Component } from '@angular/core';

@Component({
  selector: 'app-public-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isMenuOpen = false;
  isDropdownOpened = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(){
    this.isDropdownOpened = !this.isDropdownOpened;
  }

}
