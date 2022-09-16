import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PetRepositoryService } from '../pet-repository.service';
import { IPet } from '../pet.model';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  constructor(
    private petRepository: PetRepositoryService,
    private petService: PetService
  ) {}
  petStatus: string[] = [];
  pets$!: Observable<IPet[]>;

  ngOnInit(): void {
    this.petStatus = this.petService.getAllPetStatus();
    this.pets$ = this.petRepository.getPetsByStatus('available');
  }

  onSelectStatus(newStatus: string): void {
    this.pets$ = this.petRepository.getPetsByStatus(newStatus);
  }
}
