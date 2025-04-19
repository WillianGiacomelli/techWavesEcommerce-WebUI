import { Component, inject, OnInit } from '@angular/core';
import { CartBehaviorService } from '../../../../state/cart.service';

@Component({
  selector: 'app-public-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  public isMenuOpen = false;
  public isDropdownOpened = false;
  public cartService = inject(CartBehaviorService);

  ngOnInit(): void {
    if(!this.cartService.getProductsAdded()){
      this.cartService.getCartItemsFromLocalStorage();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(){
    this.isDropdownOpened = !this.isDropdownOpened;
  }

}
