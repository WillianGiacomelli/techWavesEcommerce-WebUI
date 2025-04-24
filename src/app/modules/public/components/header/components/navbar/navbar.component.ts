import { Component, inject, OnInit } from '@angular/core';
import { CartBehaviorService } from '../../../../state/cart.service';

@Component({
  selector: 'app-public-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  public isThereAnyItemInCart: boolean = true;
  public isMenuOpen = false;
  public isDropdownOpened = false;
  public cartService = inject(CartBehaviorService);

  async ngOnInit(): Promise<void> {
    if(!this.cartService.getProductsAdded()){
      await this.cartService.getCartItemsFromIndexedDB();
    }

    this.isThereAnyItemInCart = !!this.cartService.getProductsAdded()?.length;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleDropdown(){
    this.isDropdownOpened = !this.isDropdownOpened;
  }

}
