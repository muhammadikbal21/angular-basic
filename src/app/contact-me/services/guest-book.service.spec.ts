import { TestBed } from '@angular/core/testing';

import { GuestBookService } from './guest-book.service';

describe('GuestBookService', () => {
  let service: GuestBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
