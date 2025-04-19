import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartBehaviorService {
  private _productsAdded: WritableSignal<any[] | null> = signal(null);
  private _amountOfProducts: WritableSignal<number> = signal(0);
  private _totalCartPrice:WritableSignal<number> = signal(0);

  public getProductsAdded(): any[] | null{
    return this._productsAdded();
  }

  public getAmountOfProducts(): number{
    return this._amountOfProducts();
  }

  public getTotalCartPrice(): number{
    return this._totalCartPrice();
  }

  public getCartItemsFromLocalStorage(): void{
    const localStorageCartItemsString = localStorage.getItem("cartItems");
    const localStorageCartItemsObj = JSON.parse(localStorageCartItemsString!);

    this._amountOfProducts.set(localStorageCartItemsObj.amountOfProducts);
    this._productsAdded.set(localStorageCartItemsObj.cartItems);
    this._totalCartPrice.set(localStorageCartItemsObj.totalCartPrice);
  }

  public setCartIntoLocalStorage(): void{
    let cart = {
      cartItems: this._productsAdded(),
      amountOfProducts: this._amountOfProducts(),
      totalCartPrice: this._totalCartPrice()
    }
    localStorage.setItem("cartItems", JSON.stringify(cart));
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
    this.setCartIntoLocalStorage();
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
      this.setCartIntoLocalStorage();
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
    this.setCartIntoLocalStorage();
  }

}
