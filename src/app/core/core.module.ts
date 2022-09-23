import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';

const coreModules = [
  BrowserModule,
  HttpClientModule,
  BrowserAnimationsModule,
  LayoutModule,
];

const coreComponents = [AuthComponent, NavbarComponent, HomeComponent];

@NgModule({
  declarations: [...coreComponents],
  imports: [...coreModules, SharedModule, RouterModule],
  exports: [...coreModules, ...coreComponents, SharedModule],
})
export class CoreModule {}
