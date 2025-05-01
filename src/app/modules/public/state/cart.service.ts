import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { IndexedDbService } from '../../../core/utils/indexedDB/indexedDb.service';
import { firstValueFrom } from 'rxjs';

export interface Product {
  id: number;
  price: number;
  amount: number;
  totalPrice: number;
  [key: string]: any;
}

export interface CartData {
  id: string;
  cartItems: Product[] | null;
  amountOfProducts: number;
  totalCartPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartBehaviorService {
  private _productsAdded: WritableSignal<any[] | null> = signal(null);
  private _amountOfProducts: WritableSignal<number> = signal(0);
  private _totalCartPrice:WritableSignal<number> = signal(0);
  private _indexedDbService = inject(IndexedDbService);
  private readonly CART_TABLE = 'cart';
  private readonly CART_STATE_KEY = 'cart-state';

  public getProductsAdded(): any[] | null{
    return this._productsAdded();
  }

  public getAmountOfProducts(): number{
    return this._amountOfProducts();
  }

  public getTotalCartPrice(): number{
    return this._totalCartPrice();
  }

  public async getCartItemsFromIndexedDB(): Promise<void> {
    try {
      const cartData = await firstValueFrom(
        this._indexedDbService.getByKey<CartData>(this.CART_TABLE, this.CART_STATE_KEY)
      );
      if (cartData) {
        this._productsAdded.set(cartData.cartItems || null);
        this._amountOfProducts.set(cartData.amountOfProducts || 0);
        this._totalCartPrice.set(cartData.totalCartPrice || 0);
      }
    } catch (error) {
      console.error('Error loading cart from IndexedDB:', error);
    }
  }

  private async _setCartIntoIndexedDB(): Promise<void> {
    try {
      const cartData: CartData = {
        id: this.CART_STATE_KEY,
        cartItems: this._productsAdded(),
        amountOfProducts: this._amountOfProducts(),
        totalCartPrice: this._totalCartPrice()
      };
      await firstValueFrom(this._indexedDbService.updateData(this.CART_TABLE, cartData));
    } catch (error) {
      console.error('Error saving cart to IndexedDB:', error);
    }
  }

  public calculateTotalPriceOfCart(): void {
    if(this._amountOfProducts() > 0){
      let totalPrice = 0;
      this._productsAdded()!.forEach(p => {
        totalPrice = p.totalPrice + totalPrice;
      });

      this._totalCartPrice.set(totalPrice);
    }
  }

  public removeProductFromCart(productId: number): void {
    let updatedProducts = this._productsAdded()!.filter(p => p.id !== productId);

    this._productsAdded.set(updatedProducts);
    this._amountOfProducts.set(this._amountOfProducts() - 1);
    this._setCartIntoIndexedDB();
  }

  public removeOneItemFromAmount(productId:any): void{
    const products = this._productsAdded();
    const productExists = products!.find((p) => p.id === productId);

    if (productExists) {
      const updatedProducts = products!.map((p) => {
        if (p.id === productId) {
          return { ...p, amount: p.amount - 1, totalPrice: p.price * (p.amount - 1) };
        }
        return p;
      });
      this._productsAdded.set(updatedProducts);
      this._amountOfProducts.set(this._amountOfProducts() - 1);
      this.calculateTotalPriceOfCart();
      this._setCartIntoIndexedDB();
    };
  }

  public addProductToCart(product:any): void{
    const products = this._productsAdded() ?? [];
    const productExists = products!.find((p) => p.id === product.id);

    if (productExists) {
      const updatedProducts = products!.map((p) => {
        if (p.id === product.id) {
          return { ...p, amount: p.amount + 1, totalPrice: p.price * (p.amount + 1) };
        }
        return p;
      });
      this._productsAdded.set(updatedProducts);
      this._amountOfProducts.set(this._amountOfProducts() + 1);
    } else {
      product.amount = 1;
      product.totalPrice = product.price * product.amount;
      this._productsAdded.set([...products!, product]);
      this._amountOfProducts.set(this._amountOfProducts() + 1);
    }
    this.calculateTotalPriceOfCart();
    this._setCartIntoIndexedDB();
  }

}
