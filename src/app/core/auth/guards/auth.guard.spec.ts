import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { firstValueFrom, Observable, of } from 'rxjs';

import { AuthRepositoryService } from '../services/auth-repository.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authRepositorySpy: any;
  let currentUserSpy: any;

  beforeEach(() => {
    authRepositorySpy = jasmine.createSpyObj(
      'AuthRepositoryService',
      [],
      ['currentUser$']
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        { provide: AuthRepositoryService, useValue: authRepositorySpy },
      ],
    });

    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should enable to load when user exists', async () => {
    (
      Object.getOwnPropertyDescriptor(authRepositorySpy, 'currentUser$')!
        .get as any
    ).and.returnValue(of('any username'));

    const res: boolean = await firstValueFrom(
      guard.canLoad({}, []) as Observable<boolean>
    );

    expect(res).toBeTrue();
  });

  it('should unable to load when user does not exist', () => {});
});
