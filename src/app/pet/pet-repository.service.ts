import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IPet } from './pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetRepositoryService {
  private petStatus = ['sold', 'pending', 'available'];

  constructor(private http: HttpClient) {}

  getPetsByStatus(status: string): Observable<IPet[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/pet/findByStatus`, {
      params: { status },
    });
  }

  getAllPetStatus(): string[] {
    return [...this.petStatus];
  }

  getPetById(petId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/pet/${petId}`);
  }
}
