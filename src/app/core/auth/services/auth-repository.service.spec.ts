import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthRepositoryService } from './auth-repository.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, take, throwError } from 'rxjs';

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

  it('should sign up when username is available', () => {
    let alreadyCalled = false;
    spyOn(http, 'get').and.callFake(() => {
      if (alreadyCalled) {
        return of(userDto as any);
      }
      alreadyCalled = true;
      return throwError(() => new Error('error'));
    });

    spyOn(http, 'post').and.returnValue(of({}));

    service
      .signup$(userDto)
      .pipe(take(1))
      .subscribe((usr) => {
        expect(usr.username).toEqual(userDto.username);
        expect(usr.password).toEqual(userDto.password);
      });
  });

  it('should not sign up when username is not available', () => {});

  it('should log in when username exists and password is correct', () => {});

  it('should not log in when username does not exist', () => {});

  it('should not log in when password is invalid', () => {});

  it('should log out', () => {});
});
