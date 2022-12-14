import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  Router, UrlSegment,
  UrlTree
} from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthRepositoryService } from '../services/auth-repository.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(
    private authRepository: AuthRepositoryService,
    private router: Router
  ) {}

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authRepository.currentUser$.pipe(
      map((user) => {
        if (!!!user) {
          this.router.navigate(['auth'], {queryParams: { signup: false }});
        }
        return !!user;
      })
    );  }


}
