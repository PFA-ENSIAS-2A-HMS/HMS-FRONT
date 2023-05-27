import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RoomService } from './branch.service';

describe('RoomService', () => {
  let service: RoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [RoomService]
    });
    service = TestBed.inject(RoomService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
