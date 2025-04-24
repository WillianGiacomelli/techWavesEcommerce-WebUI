import { inject, Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private _indexedDbService = inject(NgxIndexedDBService);

  public addDataToTable$<T>(table: string, data: T): Observable<any> {
    return this._indexedDbService.add(table, data);
  }

  public getAllData$<T>(table:string): Observable<any>{
    return this._indexedDbService.getAll(table);
  }

  public getByKey<T>(table: string, key: string): Observable<T> {
    return this._indexedDbService.getByKey(table, key);
  }

  public updateData<T>(table: string, data: T): Observable<any> {
    return this._indexedDbService.update(table, data);
  }
}
