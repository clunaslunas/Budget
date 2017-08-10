import { TestBed, inject } from '@angular/core/testing';

import { ProcessZoneService } from './process-zone.service';

describe('ProcessZoneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessZoneService]
    });
  });

  it('should be created', inject([ProcessZoneService], (service: ProcessZoneService) => {
    expect(service).toBeTruthy();
  }));
});
