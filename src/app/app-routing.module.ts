import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/home/home.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { AuthenticationComponent } from './user/authentication/authentication.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'auth',
    children: [
      { path: 'login', component: AuthenticationComponent },
      { path: 'signup', component: AuthenticationComponent },
    ],
  },
  {
    path: 'pet',
    children: [{ path: 'index', component: PetListComponent }],
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
