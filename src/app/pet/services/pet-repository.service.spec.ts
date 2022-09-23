import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of } from 'rxjs';

import { IPetDto } from '../models/pet-dto.model';
import { IPet } from '../models/pet.model';
import { PetRepositoryService } from './pet-repository.service';

describe('PetRepositoryService', () => {
  let service: PetRepositoryService;
  let http: HttpClient;
  let petDto: IPetDto;
  let pendingPets: IPet[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PetRepositoryService],
    });
    service = TestBed.inject(PetRepositoryService);
    http = TestBed.inject(HttpClient);
    petDto = {
      id: 1,
      name: 'kitty',
      status: 'pending',
      photoUrls: ['testUrl'],
    };
    pendingPets = [
      {
        id: 1,
        name: 'kitty',
        status: 'pending',
        imageUrl: 'testUrl',
      },
      {
        id: 2,
        name: 'kitty2',
        status: 'pending',
        imageUrl: 'testUrl2',
      },
      {
        id: 3,
        name: 'kitty3',
        status: 'pending',
        imageUrl: 'testUrl3',
      },
    ];
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should post a pet', async () => {
    spyOn(http, 'post').and.returnValue(of<IPetDto>(petDto));
    const pet: IPet = await firstValueFrom(service.postPet$({} as any));
    for (const key of Object.keys(pet)) {
      expect((pet as any)[key]).toEqual((pendingPets[0] as any)[key]);
    }
  });

  it('should get pets by status', () => {});
});
