import { TestBed } from '@angular/core/testing';

import { KeyboardsTypesService } from './keyboards-types.service';

describe('KeyboardsTypesService', () => {
  let service: KeyboardsTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardsTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
