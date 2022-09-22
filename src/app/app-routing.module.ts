import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AddPetComponent } from './pet/add-pet/add-pet.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { AuthComponent } from './user/auth/auth.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'pet',
    children: [
      { path: 'index/:status', component: PetListComponent },
      { path: 'new', component: AddPetComponent },
      { path: '**', redirectTo: 'index/available' },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
