/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProducBehaviorService } from './product.service';

describe('Service: Product', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProducBehaviorService]
    });
  });

  it('should ...', inject([ProducBehaviorService], (service: ProducBehaviorService) => {
    expect(service).toBeTruthy();
  }));
});
