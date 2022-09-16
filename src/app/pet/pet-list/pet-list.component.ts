import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PetRepositoryService } from '../pet-repository.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  constructor(private petRepository: PetRepositoryService) {}
  status$!: Observable<string[]>;

  ngOnInit(): void {
    this.status$ = this.petRepository.getAllPetStatus();
  }
}
