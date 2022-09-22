import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPetComponent } from './add-pet/add-pet.component';
import { PetListComponent } from './pet-list/pet-list.component';

const routes: Routes = [
  { path: 'index/:status', component: PetListComponent },
  { path: 'new', component: AddPetComponent },
  { path: '**', redirectTo: 'index/available' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetRoutingModule {}
