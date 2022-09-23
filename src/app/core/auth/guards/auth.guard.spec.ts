import { TestBed } from '@angular/core/testing';

import { AuthRepositoryService } from '../services/auth-repository.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authRepositorySpy: any;

  beforeEach(() => {
    authRepositorySpy = jasmine.createSpy('AuthRepositoryService');
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthRepositoryService, useValue: authRepositorySpy },
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
