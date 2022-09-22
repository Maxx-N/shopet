import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AuthRepositoryService } from 'src/app/core/auth-repository.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuth$ = new Observable<boolean>();

  constructor(private authRepository: AuthRepositoryService) {}

  ngOnInit(): void {
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
