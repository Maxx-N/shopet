import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ScreenSize } from './screen-size.enum';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  currentScreenSize$: Observable<ScreenSize>;

  displayNameMap = new Map([
    [Breakpoints.XSmall, ScreenSize.XS],
    [Breakpoints.Small, ScreenSize.S],
    [Breakpoints.Medium, ScreenSize.M],
    [Breakpoints.Large, ScreenSize.L],
    [Breakpoints.XLarge, ScreenSize.XL],
  ]);

  constructor(breakpointObserver: BreakpointObserver) {
    this.currentScreenSize$ = breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((result) => {
          const res = Object.keys(result.breakpoints).find((query) => {
            return result.breakpoints[query];
          });

          return this.displayNameMap.get(res!) as ScreenSize;
        })
      );
  }
}
