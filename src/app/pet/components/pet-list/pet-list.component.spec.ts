import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { PetRepositoryService } from '../../services/pet-repository.service';
import { PetService } from '../../services/pet.service';
import { PetListComponent } from './pet-list.component';

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;
  let petRepositorySpy: any;
  let petServiceSpy: any;

  beforeEach(() => {
    petRepositorySpy = jasmine.createSpyObj('PetRepositoryService', [
      'getPetsByStatus$',
    ]);
    petServiceSpy = jasmine.createSpyObj('PetService', ['getAllPetStatus']);

    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule,
      ],
      declarations: [PetListComponent],
      providers: [
        { provide: PetRepositoryService, useValue: petRepositorySpy },
        { provide: PetService, useValue: petServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
