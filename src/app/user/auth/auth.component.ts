import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthRepositoryService } from '../auth-repository.service';

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
    private authRepository: AuthRepositoryService
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
      console.log(this.form.value);
    }
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
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
