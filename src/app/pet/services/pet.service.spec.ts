import { TestBed } from '@angular/core/testing';

import { PetService } from './pet.service';

describe('PetService', () => {
  let service: PetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetService],
    });
    service = TestBed.inject(PetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a copy of pet status', () => {
    const result: string[] = service.getAllPetStatus();

    const expectedObj = { 0: 'sold', 1: 'pending', 2: 'available' };

    for (const key of Object.keys(expectedObj)) {
      expect(result[+key] ).toEqual((expectedObj as any)[key])
    }
  });
});
