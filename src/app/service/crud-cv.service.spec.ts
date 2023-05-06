import { TestBed } from '@angular/core/testing';

import { CrudCVService } from './crud-cv.service';

describe('CrudCVService', () => {
  let service: CrudCVService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudCVService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
