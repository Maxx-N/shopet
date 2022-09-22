import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUserDto } from 'src/app/core/user-dto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryService {
  private baseUrl = `${environment.apiUrl}/user`;
  private currentUserSubject$ = new BehaviorSubject<string | null>(null);
  currentUser$: Observable<string | null> =
    this.currentUserSubject$.asObservable();

  constructor(private http: HttpClient) {}

  signup$(userDto: IUserDto): Observable<IUserDto> {
    return this.isUsernameAvailable(userDto.username).pipe(
      switchMap((res: boolean) => {
        if (res) {
          return this.http.post<IUserDto>(this.baseUrl, { ...userDto });
        }
        throw new Error('Username is already taken.');
      }),
      switchMap(() => {
        return this.http.get<IUserDto>(`${this.baseUrl}/${userDto.username}`);
      }),
      tap((res: any) => {
        this.currentUserSubject$.next(res.username);
      })
    );
  }

  login$(userDto: IUserDto): Observable<IUserDto> {
    return this.http.get<IUserDto>(`${this.baseUrl}/${userDto.username}`).pipe(
      catchError(() => {
        throw new Error('Username does not exist.');
      }),
      map((res: IUserDto) => {
        if (res.password === userDto.password) {
          this.currentUserSubject$.next(res.username);
          return res;
        }
        throw new Error('Invalid Password.');
      })
    );
  }

  logout(): void {
    this.currentUserSubject$.next(null);
  }

  private isUsernameAvailable(username: string): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/${username}`).pipe(
      map(() => {
        return false;
      }),
      catchError(() => {
        return of(true);
      })
    );
  }
}
