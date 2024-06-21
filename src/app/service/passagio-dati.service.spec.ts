import { TestBed } from '@angular/core/testing';

import { PassagioDatiService } from './passagio-dati.service';

describe('PassagioDatiService', () => {
  let service: PassagioDatiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassagioDatiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
