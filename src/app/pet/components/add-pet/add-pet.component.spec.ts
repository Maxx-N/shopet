import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { PetRepositoryService } from '../../services/pet-repository.service';
import { PetService } from '../../services/pet.service';
import { AddPetComponent } from './add-pet.component';
import { UiService } from 'src/app/shared/ui.service';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AddPetComponent', () => {
  let component: AddPetComponent;
  let fixture: ComponentFixture<AddPetComponent>;
  let petRepositorySpy: any;
  let petServiceSpy: any;
  let uiServiceSpy: any;

  beforeEach(() => {
    petRepositorySpy = jasmine.createSpyObj('PetRepositoryService', [
      'postPet$',
    ]);
    petServiceSpy = jasmine.createSpyObj('PetService', ['getAllPetStatus']);
    uiServiceSpy = jasmine.createSpyObj('UiService', ['show3secSnackBar']);

    petRepositorySpy.postPet$.and.returnValue(of({ status: 'test' }));

    TestBed.configureTestingModule({
      declarations: [AddPetComponent],
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        RouterTestingModule.withRoutes([
          { path: 'pet/index/test', component: {} as any },
        ]),
      ],
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

  it('should try to post a pet if form is valid', () => {
    component.form.setValue({
      name: 'test',
      status: 'pending',
      imageUrl: 'test',
    });
    component.onAddPet();
    expect(petRepositorySpy.postPet$).toHaveBeenCalled();
  });

  it('should not try to post a pet if form as empty name', () => {
    component.form.setValue({
      name: '',
      status: 'pending',
      imageUrl: 'test',
    });
    component.onAddPet();
    expect(petRepositorySpy.postPet$).not.toHaveBeenCalled();
  });

  it('should not try to post a pet if form as empty status', () => {
    component.form.setValue({
      name: 'test',
      status: '',
      imageUrl: 'test',
    });
    component.onAddPet();
    expect(petRepositorySpy.postPet$).not.toHaveBeenCalled();
  });

  it('should not try to post a pet if form as empty image URL', () => {
    component.form.setValue({
      name: 'test',
      status: 'pending',
      imageUrl: '',
    });
    component.onAddPet();
    expect(petRepositorySpy.postPet$).not.toHaveBeenCalled();
  });
});
