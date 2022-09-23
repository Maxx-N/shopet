import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  currentScreenSize$: Observable<string | undefined>;

  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XS'],
    [Breakpoints.Small, 'S'],
    [Breakpoints.Medium, 'M'],
    [Breakpoints.Large, 'L'],
    [Breakpoints.XLarge, 'XL'],
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

          return this.displayNameMap.get(res!);
        })
      );
  }
}
