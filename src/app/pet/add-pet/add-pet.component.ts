import { Component, OnInit } from '@angular/core';

import { PetRepositoryService } from '../pet-repository.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.scss'],
})
export class AddPetComponent implements OnInit {
  constructor(private petRepository: PetRepositoryService) {}

  ngOnInit(): void {
    // this.petRepository
    //   .postPet(
    //     'test 2',
    //     'sold',
    //     'https://i.pinimg.com/736x/9a/be/5f/9abe5f0ad84b083a1a52dac183c7bc89.jpg'
    //   )
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
  }
}
