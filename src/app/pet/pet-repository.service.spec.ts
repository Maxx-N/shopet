import { TestBed } from '@angular/core/testing';

import { PetRepositoryService } from './pet-repository.service';

describe('PetRepositoryService', () => {
  let service: PetRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
