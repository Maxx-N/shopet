import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IPet } from '../../models/pet.model';

@Component({
  selector: 'app-pet-detail',
  templateUrl: './pet-detail.component.html',
  styleUrls: ['./pet-detail.component.scss'],
})
export class PetDetailComponent {
  pet: IPet;

  constructor(@Inject(MAT_DIALOG_DATA) data: { pet: IPet }) {
    this.pet = data.pet;
  }
}
