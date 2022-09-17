import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { PetRepositoryService } from '../pet-repository.service';
import { IPet } from '../pet.model';
import { PetService } from '../pet.service';
import { UiService } from 'src/app/shared/ui.service';

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
    private petService: PetService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.petStatus = this.petService.getAllPetStatus();
  }

  onAddPet(): void {
    if (this.form.valid) {
      this.petRepository.postPet({ ...(this.form.value as IPet) }).subscribe({
        next: (result: IPet) => {
          const message = `Congratulations!!! Your pet "${result.name}" was successfully created!`;
          this.uiService.show3secSnackBar(message);
          this.form.reset();
        },
        error: () => {
          const message = 'Sorry, your pet wasn\'t added because an error occurred. Please try again later.';
          this.uiService.show3secSnackBar(message);
        },
      });
    }
  }
}
