import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProducBehaviorService {

constructor() { }
  private _productSelected: WritableSignal<any> = signal(null);

  public getProductSelected(): Signal<any>{
    return this._productSelected();
  }

  public setProductSelected(product:any): void{
    this._productSelected.set(product);
  }
}
