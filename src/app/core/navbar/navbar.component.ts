import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';

import { AuthRepositoryService } from 'src/app/core/auth-repository.service';
import { ResponsiveService } from '../responsive.service';
import { ScreenSize } from '../screen-size.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuth$ = new Observable<boolean>();
  isScreenSmall$ = new Observable<boolean>();

  constructor(
    private authRepository: AuthRepositoryService,
    private responsiveService: ResponsiveService
  ) {}

  ngOnInit(): void {
    this.isScreenSmall$ = this.responsiveService.currentScreenSize$.pipe(
      map((size) => {
        return size === ScreenSize.S || size === ScreenSize.XS;
      })
    );

    this.isAuth$ = this.authRepository.currentUser$.pipe(
      map((user) => {
        return !!user;
      })
    );
  }

  onLogout(): void {
    this.authRepository.logout();
  }
}
