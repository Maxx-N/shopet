import { Component, OnInit } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { AuthRepositoryService } from 'src/app/user/auth-repository.service';

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
      switchMap((user) => {
        console.log(user);
        return of(!!user);
      })
    );
  }
}
