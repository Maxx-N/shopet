import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { AuthenticationComponent } from './user/authentication/authentication.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './core/navbar/navbar.component';
import { HomeComponent } from './core/home/home.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddPetComponent } from './pet/add-pet/add-pet.component';

@NgModule({
  declarations: [
    AppComponent,
    PetListComponent,
    AuthenticationComponent,
    NavbarComponent,
    HomeComponent,
    AddPetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
