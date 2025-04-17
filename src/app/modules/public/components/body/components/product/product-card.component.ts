import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product: any;
  public route = inject(ActivatedRoute);
  public router = inject(Router);

  public navigateToProduct(id:number) : void{
    this.router.navigate(['product', id]);
  }
}
