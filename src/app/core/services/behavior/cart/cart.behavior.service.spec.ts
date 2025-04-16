import { TestBed } from '@angular/core/testing';

import { CartBehaviorService } from './cart.behavior.service';

describe('CartBehaviorService', () => {
  let service: CartBehaviorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartBehaviorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
