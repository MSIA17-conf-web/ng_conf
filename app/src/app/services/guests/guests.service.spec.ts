import { TestBed } from '@angular/core/testing';

import { GuestsService } from './guests.service';

describe('GuestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GuestsService = TestBed.get(GuestsService);
    expect(service).toBeTruthy();
  });
});
