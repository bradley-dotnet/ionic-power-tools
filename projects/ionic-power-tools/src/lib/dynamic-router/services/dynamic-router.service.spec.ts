import { TestBed } from '@angular/core/testing';

import { DynamicRouterService } from './dynamic-router.service';

describe('DynamicRouterService', () => {
  let service: DynamicRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
