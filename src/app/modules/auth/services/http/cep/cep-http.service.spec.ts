/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CepHttpService } from './cep-http.service';

describe('Service: CepHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CepHttpService]
    });
  });

  it('should ...', inject([CepHttpService], (service: CepHttpService) => {
    expect(service).toBeTruthy();
  }));
});
