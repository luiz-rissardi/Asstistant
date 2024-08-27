import { TestBed } from '@angular/core/testing';

import { MasterHandlerService } from './master-handler.service';

describe('MasterHandlerService', () => {
  let service: MasterHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
