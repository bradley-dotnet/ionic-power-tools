import { TestBed } from '@angular/core/testing';

import { RouteTreeTraverserService } from './route-tree-traverser.service';

describe('RouteTreeTraverserService', () => {
  let service: RouteTreeTraverserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteTreeTraverserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
