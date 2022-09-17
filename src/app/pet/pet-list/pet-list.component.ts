import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { PetRepositoryService } from '../pet-repository.service';
import { IPet } from '../pet.model';
import { PetService } from '../pet.service';
import { PetDetailComponent } from '../pet-detail/pet-detail.component';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  constructor(
    private petRepository: PetRepositoryService,
    private petService: PetService,
    private dialog: MatDialog
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

  onSelectPet(event: any) {
    const selectedPet: IPet = event.options[0].value;
    this.dialog.open(PetDetailComponent)
  }
}
