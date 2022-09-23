import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetRepositoryService } from '../../services/pet-repository.service';
import { PetService } from '../../services/pet.service';
import { AddPetComponent } from './add-pet.component';
import { UiService } from 'src/app/shared/ui.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddPetComponent', () => {
  let component: AddPetComponent;
  let fixture: ComponentFixture<AddPetComponent>;
  let petRepositorySpy: any;
  let petServiceSpy: any;
  let uiServiceSpy: any;

  beforeEach(() => {
    petRepositorySpy = jasmine.createSpy('PetRepositoryService');
    petServiceSpy = jasmine.createSpyObj('PetService', ['getAllPetStatus']);
    uiServiceSpy = jasmine.createSpy('UiService');

    TestBed.configureTestingModule({
      declarations: [AddPetComponent],
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [
        { provide: PetRepositoryService, useValue: petRepositorySpy },
        { provide: PetService, useValue: petServiceSpy },
        { provide: UiService, useValue: uiServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
