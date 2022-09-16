import { Component, OnInit } from '@angular/core';
import { PetRepositoryService } from '../pet-repository.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.scss'],
})
export class PetListComponent implements OnInit {
  constructor(private petRepository: PetRepositoryService) {}

  ngOnInit(): void {
    this.petRepository.getPetById(1).subscribe((pet) => {
      console.log(pet);
    });
  }
}
