import { Component, inject, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IndexedDbService } from '../../../../core/utils/indexedDB/indexedDb.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  private _indexedDbService = inject(IndexedDbService)

  ngOnInit(): void {
    const person = { id: 1, name: 'John' };
    // this._indexedDbService.addDataToTable('people',person)
  }

}
