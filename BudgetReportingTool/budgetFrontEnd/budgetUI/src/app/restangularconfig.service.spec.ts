import { TestBed, inject } from '@angular/core/testing';

import { RestangularconfigService } from './restangularconfig.service';

describe('RestangularconfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RestangularconfigService]
    });
  });

  it('should be created', inject([RestangularconfigService], (service: RestangularconfigService) => {
    expect(service).toBeTruthy();
  }));
});
