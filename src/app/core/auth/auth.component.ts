import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';

import { AuthRepositoryService } from './services/auth-repository.service';
import { UiService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignup = false;
  form!: FormGroup;
  private queryParamsSubscription!: Subscription;
  private passwordChangeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private authRepository: AuthRepositoryService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.isSignup = queryParams.signup === 'true';
        this.initForm();
      }
    );
  }

  ngOnDestroy(): void {
    [this.queryParamsSubscription, this.passwordChangeSubscription].forEach(
      (subscription) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      }
    );
  }

  onAuth(): void {
    if (this.form.valid) {
      if (this.isSignup) {
        this.tryToSignup();
      } else {
        this.tryToLogin();
      }
    }
  }

  private tryToSignup(): void {
    this.authRepository
      .signup$({
        username: this.form.value.username,
        password: this.form.value.password,
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.uiService.show3secSnackBar('Successfully Signed Up!');
          this.router.navigate(['pet']);
        },
        error: (err: any) => {
          this.uiService.show3secSnackBar(err.message);
        },
      });
  }

  private tryToLogin(): void {
    this.authRepository
      .login$({ ...this.form.value })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.uiService.show3secSnackBar('Successfully Logged In!');
          this.router.navigate(['pet']);
        },
        error: (err: any) => {
          this.uiService.show3secSnackBar(err.message);
        },
      });
  }

  private initForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });

    if (this.isSignup) {
      this.addPasswordConfirmation();
    }
  }

  private addPasswordConfirmation(): void {
    this.form.addControl(
      'confirmPassword',
      new FormControl('', {
        validators: [
          Validators.required,
          this.confirmPasswordValidator.bind(this),
        ],
      })
    );
    this.passwordChangeSubscription = this.form
      .get('password')
      ?.valueChanges.subscribe(() => {
        this.form.controls['confirmPassword'].updateValueAndValidity();
      })!;
  }

  private confirmPasswordValidator(control: AbstractControl): any {
    if (control.value !== this.form.get('password')?.value) {
      return { unmatchingPasswords: true };
    }
    return null;
  }
}
