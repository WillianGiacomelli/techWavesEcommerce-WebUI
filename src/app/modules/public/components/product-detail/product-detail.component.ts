import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProducBehaviorService } from '../../state/product.service';
import { CartBehaviorService } from '../../state/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit, OnDestroy {
    public activatedroute = inject(ActivatedRoute);
    public route = inject(Router);
    public productService = inject(ProducBehaviorService);
    public cartService = inject(CartBehaviorService);
    public product: any;

    ngOnInit(): void {
      // this.activatedroute.paramMap.subscribe(params => {
      //   const id = Number(params.get('id'));
      // });
      if(!this.productService.getProductSelected()){
        const localStorageProductSelectedString = localStorage.getItem("productSelected");
        const localStorageProductSelectedObject = JSON.parse(localStorageProductSelectedString!);
        this.productService.setProductSelected(localStorageProductSelectedObject);
      }

      this.product = this.productService.getProductSelected();


    }

    public addToCart(): void {
      this.cartService.addProductToCart(this.product);
      this.route.navigate(['/cart']);
    }

    ngOnDestroy(): void {
      console.log("vou destruir")
    }
}
