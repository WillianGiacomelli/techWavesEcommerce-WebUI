import { Injectable, Signal, signal, WritableSignal, inject } from '@angular/core';
import { IndexedDbService } from '../../../core/utils/indexedDB/indexedDb.service';

@Injectable({
  providedIn: 'root'
})
export class ProducBehaviorService {

constructor() { }
  private _productSelected: WritableSignal<any> = signal(null);

  private _indexedDbService = inject(IndexedDbService);

  public getProductSelected(): Signal<any>{
    return this._productSelected();
  }

  public setProductSelected(product:any): void{
    this._productSelected.set(product);
    this._indexedDbService.addDataToTable("productSelected",product);
  }
}
