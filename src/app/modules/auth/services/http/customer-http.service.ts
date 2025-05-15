import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/local';
import { SignUpModel } from '../../../../core/models/signUp/signUp.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerHtppService {
  private _customerURL = environment.customerURL;

  constructor(private http: HttpClient) {}

  public create(customer: SignUpModel): Observable<any> {
    return this.http.post(`${this._customerURL}`, customer);
  }
}
