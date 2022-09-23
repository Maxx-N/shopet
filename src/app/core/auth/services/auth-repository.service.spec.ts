import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of, throwError } from 'rxjs';

import { AuthRepositoryService } from './auth-repository.service';
import { IUserDto } from '../models/user-dto.model';

describe('AuthRepositoryService', () => {
  let service: AuthRepositoryService;
  let http: HttpClient;
  let userDto: IUserDto;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthRepositoryService);
    http = TestBed.inject(HttpClient);
    userDto = { username: 'bob', password: '123' };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up when username is available', async () => {
    let alreadyCalled = false;
    spyOn(http, 'get').and.callFake(() => {
      if (alreadyCalled) {
        return of(userDto as any);
      }
      alreadyCalled = true;
      return throwError(() => new Error('error'));
    });
    spyOn(http, 'post').and.returnValue(of({}));

    const usr: IUserDto = await firstValueFrom(service.signup$(userDto));

    expect(usr.username).toEqual(userDto.username);
    expect(usr.password).toEqual(userDto.password);
  });

  it('should not sign up when username is not available', async () => {
    spyOn(http, 'get').and.returnValue(of({}));

    await expectAsync(
      firstValueFrom(service.signup$(userDto))
    ).toBeRejectedWith(Error('Username is already taken.'));
  });

  it('should log in when username exists and password is correct', () => {});

  it('should not log in when username does not exist', () => {});

  it('should not log in when password is invalid', () => {});

  it('should log out', () => {});
});
