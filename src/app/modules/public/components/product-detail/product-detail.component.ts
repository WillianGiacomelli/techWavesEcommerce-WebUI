import { Component, inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../state/product.service';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
    public route = inject(ActivatedRoute);
    public productService = inject(ProductService);
    public product: any;

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
      });
      if(this.productService.getProductSelected()){
        this.product = this.productService.getProductSelected();
        console.log(this.product);
      }
    }
}
