import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IPet } from './pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetRepositoryService {
  constructor(private http: HttpClient) {}

  getPetsByStatus(status: string): Observable<IPet[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/pet/findByStatus`, {
        params: { status },
      })
      .pipe(
        map((results: any[]) => {
          return results.map((result: any) => {
            return {
              id: result.id,
              name: result.name,
              status: result.status,
              imageUrl: result.photoUrls[0],
            };
          });
        })
      );
  }

  getPetById(petId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/pet/${petId}`);
  }
}
