import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IPetDto } from './pet-dto.model';
import { IPet } from './pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetRepositoryService {
  constructor(private http: HttpClient) {}

  postPet(
    name: string,
    status: 'sold' | 'pending' | 'available',
    imageUrl: string
  ): Observable<IPet> {
    return this.http
      .post<IPetDto>(`${environment.apiUrl}/pet`, {
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

  getPetsByStatus(status: string): Observable<IPet[]> {
    return this.http
      .get<IPetDto[]>(`${environment.apiUrl}/pet/findByStatus`, {
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
