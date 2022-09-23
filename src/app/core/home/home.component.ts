import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ResponsiveService } from '../responsive.service';
import { ScreenSize } from '../screen-size.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  screenSize$ = new Observable<ScreenSize>();

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.screenSize$ = this.responsiveService.currentScreenSize$;
  }
}
