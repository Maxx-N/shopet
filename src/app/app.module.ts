import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './core/home/home.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { MaterialModule } from './material.module';
import { AddPetComponent } from './pet/add-pet/add-pet.component';
import { PetDetailComponent } from './pet/pet-detail/pet-detail.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { AuthenticationComponent } from './user/authentication/authentication.component';

@NgModule({
  declarations: [
    AppComponent,
    PetListComponent,
    AuthenticationComponent,
    NavbarComponent,
    HomeComponent,
    AddPetComponent,
    PetDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
