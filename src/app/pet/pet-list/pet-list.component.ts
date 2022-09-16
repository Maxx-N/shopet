import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PetRepositoryService } from '../pet-repository.service';
import { IPet } from '../pet.model';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  constructor(private petRepository: PetRepositoryService) {}
  petStatus:string[] = [];
  pets$!: Observable<IPet[]>;

  ngOnInit(): void {
    this.petStatus = this.petRepository.getAllPetStatus();
    this.pets$ = this.petRepository.getPetsByStatus('available');
  }

  onSelectStatus(newStatus: string): void {
    this.pets$ = this.petRepository.getPetsByStatus(newStatus);
  }
}
