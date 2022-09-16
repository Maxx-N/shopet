import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PetListComponent } from './pet/pet-list/pet-list.component';
import { AuthenticationComponent } from './user/authentication/authentication.component';

@NgModule({
  declarations: [AppComponent, PetListComponent, AuthenticationComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
