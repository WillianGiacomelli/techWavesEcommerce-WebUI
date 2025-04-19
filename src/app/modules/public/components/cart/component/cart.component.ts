import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartBehaviorService } from '../../../state/cart.service';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  public isThereAnyItemInCart: boolean = true;
  private _router: Router  = inject(Router);
  public cartService: CartBehaviorService = inject(CartBehaviorService)

  ngOnInit() {
  }

  public navigateToHome():void{
    this._router.navigate([""]);
  }
}
