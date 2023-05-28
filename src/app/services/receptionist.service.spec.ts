import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ReceptionistService } from './receptionist.service';

describe('ReceptionistService', () => {
  let service: ReceptionistService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ReceptionistService]
    });
    service = TestBed.inject(ReceptionistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
