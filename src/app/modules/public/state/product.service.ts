import { Injectable, Signal, signal, WritableSignal, inject } from '@angular/core';
import { IndexedDbService } from '../../../core/utils/indexedDB/indexedDb.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProducBehaviorService {

constructor() { }
  private _productSelected: WritableSignal<any> = signal(null);
  private _indexedDbService = inject(IndexedDbService);
  private readonly PRODUCT_SELECTED_TABLE = 'productSelected';
  private readonly PRODUCT_SELECTED_KEY = 'product-selected-state';

  public getProductSelected(): Signal<any>{
    return this._productSelected();
  }

  public async getCartItemsFromIndexedDB(): Promise<void> {
    try {
      const productSelectedData = await firstValueFrom(
        this._indexedDbService.getByKey<any>(this.PRODUCT_SELECTED_TABLE, this.PRODUCT_SELECTED_KEY)
      );
      if (productSelectedData) {
        this._productSelected.set(productSelectedData.product || null);
      }
    } catch (error) {
      console.error('Error loading product from IndexedDB:', error);
    }
  }


  public setProductSelected(product:any): void{
    this._productSelected.set(product);
    const selectedProduct = {
      id: this.PRODUCT_SELECTED_KEY,
      product: product
    }
    this._indexedDbService.addDataToTable$(this.PRODUCT_SELECTED_TABLE,product);
  }
}
