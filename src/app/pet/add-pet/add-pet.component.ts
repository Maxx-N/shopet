import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PetRepositoryService } from '../pet-repository.service';
import { PetService } from '../pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent implements OnInit {
  petStatus: string[] = [];

  form = new FormGroup({
    name: new FormControl('', { validators: Validators.required }),
    status: new FormControl('', { validators: Validators.required }),
    imageUrl: new FormControl('', { validators: Validators.required }),
  });

  constructor(
    private petRepository: PetRepositoryService,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    this.petStatus = this.petService.getAllPetStatus();
  }

  onAddPet(): void {
    console.log(this.form.value);
  }
}
