import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { SharedModule } from 'src/app/shared/shared.module';
import { PetDetailComponent } from './pet-detail.component';

describe('PetDetailComponent', () => {
  let component: PetDetailComponent;
  let fixture: ComponentFixture<PetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PetDetailComponent],
      imports: [MatDialogModule, SharedModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { pet: { name: 'any name' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
