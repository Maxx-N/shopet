import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { PetDetailComponent } from './components/pet-detail/pet-detail.component';
import { PetListComponent } from './components/pet-list/pet-list.component';
import { PetRepositoryService } from './services/pet-repository.service';
import { PetRoutingModule } from './pet-routing.module';
import { PetService } from './services/pet.service';

@NgModule({
  declarations: [PetListComponent, PetDetailComponent, AddPetComponent],
  imports: [SharedModule, PetRoutingModule],
  providers: [PetRepositoryService, PetService],
})
export class PetModule {}
