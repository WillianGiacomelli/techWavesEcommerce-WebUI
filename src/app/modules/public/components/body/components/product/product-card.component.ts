import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../state/product.service';

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
  public productService = inject(ProductService);

  public navigateToProduct(id:number) : void{
    this.productService.setProductSelected(this.product);
    this.router.navigate(['product', id]);
  }
}
