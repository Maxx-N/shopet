import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { firstValueFrom, of } from 'rxjs';

import { SharedModule } from 'src/app/shared/shared.module';
import { IPet } from '../../models/pet.model';
import { PetRepositoryService } from '../../services/pet-repository.service';
import { PetService } from '../../services/pet.service';
import { PetListComponent } from './pet-list.component';

describe('PetListComponent', () => {
  let component: PetListComponent;
  let fixture: ComponentFixture<PetListComponent>;
  let petRepositorySpy: any;
  let petServiceSpy: any;

  beforeEach(() => {
    petServiceSpy = jasmine.createSpyObj('PetService', ['getAllPetStatus']);
    petServiceSpy.getAllPetStatus.and.returnValue(status);
    petRepositorySpy = jasmine.createSpyObj('PetRepositoryService', [
      'getPetsByStatus$',
    ]);
    petRepositorySpy.getPetsByStatus$.and.returnValue(of(getPets()));

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
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

  it('should have the correct pet status', () => {
    const status = getPetsStatus();
    for (let i = 0; i < component.petStatus.length; i++) {
      expect(component.petStatus[i]).toEqual(status[i]);
    }
  });

  it('should have the correct pets', async () => {
    const pets = getPets();

    const result: IPet[] = await firstValueFrom(component.pets$);

    for (let i = 0; i < pets.length; i++) {
      for (const key of Object.keys(pets[i])) {
        expect((result[i] as any)[key]).toEqual((pets[i] as any)[key]);
      }
    }
  });

  const getPetsStatus = (): string[] => {
    return ['sold', 'pending', 'available'];
  };

  const getPets = (): IPet[] => {
    return [
      { id: 1, imageUrl: 'testUrl1', name: 'pet1', status: 'available' },
      { id: 2, imageUrl: 'testUrl2', name: 'pet2', status: 'available' },
      { id: 3, imageUrl: 'testUrl3', name: 'pet3', status: 'available' },
    ];
  };
});
