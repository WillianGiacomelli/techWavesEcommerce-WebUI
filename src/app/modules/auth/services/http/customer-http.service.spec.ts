/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CustomerHtppService } from './customer-http.service';

describe('Service: CustomerHtpp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerHtppService]
    });
  });

  it('should ...', inject([CustomerHtppService], (service: CustomerHtppService) => {
    expect(service).toBeTruthy();
  }));
});
