import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  public isThereAnyItemInCart: boolean = true;

  constructor(private _router: Router)
  {}

  public navigateToHome():void{
    this._router.navigate([""]);
  }
}
