import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private petStatus = ['sold', 'pending', 'available'];

  constructor() {}

  getAllPetStatus(): string[] {
    return [...this.petStatus];
  }
}
