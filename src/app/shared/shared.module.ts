import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UiService } from './ui.service';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';

const sharedModules = [
  CommonModule,
  MaterialModule,
  ReactiveFormsModule,
  FlexLayoutModule,
];

@NgModule({
  declarations: [],
  imports: [...sharedModules],
  exports: [...sharedModules],
  providers: [UiService],
})
export class SharedModule {}
