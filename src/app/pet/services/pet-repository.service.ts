import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IPetDto } from '../models/pet-dto.model';
import { IPet } from '../models/pet.model';

@Injectable()
export class PetRepositoryService {
  private baseUrl = `${environment.apiUrl}/pet`;

  constructor(private http: HttpClient) {}

  postPet$({
    name,
    status,
    imageUrl,
  }: {
    name: string;
    status: 'sold' | 'pending' | 'available';
    imageUrl: string;
  }): Observable<IPet> {
    return this.http
      .post<IPetDto>(this.baseUrl, {
        name,
        status,
        photoUrls: [imageUrl],
      })
      .pipe(
        map((result) => {
          return this.convertPetDtoToPet(result);
        })
      );
  }

  getPetsByStatus$(status: string): Observable<IPet[]> {
    return this.http
      .get<IPetDto[]>(`${this.baseUrl}/findByStatus`, {
        params: { status },
      })
      .pipe(
        map((results: IPetDto[]) => {
          return results.map((result: IPetDto) => {
            return this.convertPetDtoToPet(result);
          });
        })
      );
  }

  private convertPetDtoToPet(petDto: IPetDto): IPet {
    return {
      id: petDto.id,
      name: petDto.name,
      status: petDto.status,
      imageUrl: petDto.photoUrls[0],
    };
  }
}
