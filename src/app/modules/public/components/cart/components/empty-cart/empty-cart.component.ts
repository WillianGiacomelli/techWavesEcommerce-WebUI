import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  standalone: false,
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.scss'
})
export class EmptyCartComponent {
  constructor(private _router: Router){

  }

  public navigateToHome():void{
    this._router.navigate([""]);
  }
}
