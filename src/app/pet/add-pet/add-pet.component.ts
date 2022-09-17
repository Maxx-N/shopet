import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Router
} from '@angular/router';

import { UiService } from 'src/app/shared/ui.service';
import { PetRepositoryService } from '../pet-repository.service';
import { IPet } from '../pet.model';
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
    private petService: PetService,
    private uiService: UiService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.petStatus = this.petService.getAllPetStatus();
  }

  onAddPet(): void {
    if (this.form.valid) {
      this.petRepository.postPet({ ...(this.form.value as IPet) }).subscribe({
        next: (result: IPet) => {
          const message = `Congratulations!!! Your pet "${result.name}" was successfully created!`;
          this.uiService.show3secSnackBar(message);
          this.router.navigate(['pet', 'index']);
        },
        error: () => {
          const message =
          "Sorry, your pet wasn't added because an error occurred. Please try again later.";
          this.uiService.show3secSnackBar(message);
        },
      });
    }
  }
}
