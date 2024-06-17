import { TestBed } from '@angular/core/testing';

import { ServizioHttpService } from './servizio-http.service';

describe('ServizioHttpService', () => {
  let service: ServizioHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizioHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
