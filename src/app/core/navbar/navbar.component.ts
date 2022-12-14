import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

import { AuthRepositoryService } from 'src/app/core/auth/services/auth-repository.service';
import { UiService } from 'src/app/shared/ui.service';
import { ResponsiveService } from '../responsive/responsive.service';
import { ScreenSize } from '../responsive/screen-size.enum';

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
    private responsiveService: ResponsiveService,
    private router: Router,
    private uiService: UiService
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
    this.uiService.show3secSnackBar('Successfully Logged Out!');
    this.router.navigate(['auth'], { queryParams: { signup: false } });
  }
}
