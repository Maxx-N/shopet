import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isSignup = false;
  private queryParamsSubscription!: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (queryParams: any) => (this.isSignup = queryParams.signup === 'true')
    );
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }
}
