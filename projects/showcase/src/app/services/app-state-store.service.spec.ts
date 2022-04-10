import { TestBed } from '@angular/core/testing';

import { AppStateStoreService } from './app-state-store.service';

describe('AppStateStoreService', () => {
  let service: AppStateStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
