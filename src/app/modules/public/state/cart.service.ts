import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartBehaviorService {
  private _productsAdded: WritableSignal<any[]> = signal([]);

  public getProductsAdded(): any[]{
    return this._productsAdded();
  }

  public addProductToCart(product:any): void{
    const products = this._productsAdded();
    const productExists = products.find((p) => p.id === product.id);

    if (productExists) return;

    this._productsAdded.set([...products, product]);
  }
  constructor() { }

}
