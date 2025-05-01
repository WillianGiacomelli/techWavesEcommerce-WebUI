import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProducBehaviorService } from '../../../../../../state/product.service';

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
  public productService = inject(ProducBehaviorService);

  public navigateToProduct(id:number) : void{
    this.productService.setProductSelected(this.product);
    // localStorage.setItem("productSelected", JSON.stringify(this.product));
    this.router.navigate(['product', id]);
  }

  constructor(){

  }
}
