import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PetRepositoryService {
  constructor(private http: HttpClient) {}

  getPetsByStatus(status: string): Observable<any[]> {
    return this.http
      .get<any[]>(`${environment.apiUrl}/pet/findByStatus`, {
        params: { status },
      })
  }

  getAllPetStatus(): Observable<string[]> {
    return this.http.get<{}>(`${environment.apiUrl}/store/inventory`).pipe(
      map((res) => {
        return Object.keys(res);
      })
    );
  }

  getPetById(petId: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/pet/${petId}`);
  }
}
