import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private _indexedDbService = inject(NgxIndexedDBService);

  public addDataToTable(table: string, data: any): void {
    this._indexedDbService.add(table, data).subscribe({
      next: () => {},
      error: () => {}
    });
  }

  public getAllData(table:string): any{
    this._indexedDbService.getAll(table).subscribe((data) => {
      return data;
    });
  }
}
