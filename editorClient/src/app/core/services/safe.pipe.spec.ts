import { TestBed } from '@angular/core/testing';

import { SafePipe } from './safe.pipe';

describe('SessionManagerService', () => {
  let service: SafePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SafePipe);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
