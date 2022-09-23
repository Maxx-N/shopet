import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/auth/guards/auth.guard';
import { AuthComponent } from './core/auth/auth.component';
import { HomeComponent } from './core/home/home.component';

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
      canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
