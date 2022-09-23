import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponsiveService } from './core/responsive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  screenSize$ = new Observable<string | undefined>();

  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.screenSize$ = this.responsiveService.currentScreenSize$;
  }
}
