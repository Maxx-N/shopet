import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthRepositoryService } from './auth-repository.service';

describe('AuthRepositoryService', () => {
  let service: AuthRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up when username is available', () => {});

  it('should not sign up when username is not available', () => {});

  it('should log in when username exists and password is correct', () => {});

  it('should not log in when username does not exist', () => {});

  it('should not log in when password is invalid', () => {});

  it('should log out', () => {});
});
