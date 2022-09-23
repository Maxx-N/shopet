import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PetRepositoryService } from '../../services/pet-repository.service';
import { IPet } from '../../models/pet.model';
import { PetService } from '../../services/pet.service';
import { PetDetailComponent } from '../pet-detail/pet-detail.component';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit, OnDestroy {
  constructor(
    private petRepository: PetRepositoryService,
    private petService: PetService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  petStatus: string[] = [];
  pets$!: Observable<IPet[]>;
  selectedStatus!: 'sold' | 'pending' | 'available';
  private paramsSubscription!: Subscription;

  ngOnInit(): void {
    this.petStatus = this.petService.getAllPetStatus();
    this.pets$ = this.petRepository.getPetsByStatus$('available');
    this.paramsSubscription = this.route.params.subscribe((params: any) => {
      this.selectedStatus = params.status;
      this.pets$ = this.petRepository.getPetsByStatus$(params.status);
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  onSelectStatus(newStatus: string): void {
    this.router.navigate(['..', newStatus], { relativeTo: this.route });
  }

  onSelectPet(event: any) {
    const selectedPet: IPet = event.options[0].value;
    this.dialog.open(PetDetailComponent, { data: { pet: selectedPet } });
  }
}
