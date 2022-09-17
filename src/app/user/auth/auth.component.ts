import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthRepositoryService } from '../auth-repository.service';
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

  constructor(
    private route: ActivatedRoute,
    private authRepository: AuthRepositoryService,
    private uiService: UiService
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
    this.queryParamsSubscription.unsubscribe();
  }

  onAuth(): void {
    if (this.form.valid) {
      if (this.isSignup) {
        this.authRepository
          .signup({
            username: this.form.value.username,
            password: this.form.value.password,
          })
          .subscribe({
            next: () => {
              this.uiService.show3secSnackBar('Successfully Signed Up!');
            },
            error: (err: any) => {
              this.uiService.show3secSnackBar(err.message);
            },
          });
      } else {
        this.authRepository.login({ ...this.form.value }).subscribe({
          next: () => {
            this.uiService.show3secSnackBar('Successfully Logged In!');
          },
          error: (err: any) => {
            this.uiService.show3secSnackBar(err.message);
          },
        });
      }
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', {
        validators: [Validators.required],
      }),
    });

    if (this.isSignup) {
      this.form.addControl(
        'confirmPassword',
        new FormControl('', { validators: [Validators.required] })
      );
    }
  }
}
