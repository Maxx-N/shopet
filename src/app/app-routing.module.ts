import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { AddPetComponent } from './pet/add-pet/add-pet.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { AuthComponent } from './core/auth/auth.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'pet',
    loadChildren: () =>
      import('src/app/pet/pet.module').then((m) => m.PetModule),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
