import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { UiService } from 'src/app/shared/ui.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResponsiveService } from '../responsive/responsive.service';
import { firstValueFrom, of } from 'rxjs';
import { ScreenSize } from '../responsive/screen-size.enum';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let uiServiceSpy: any;
  let responsiveServiceSpy: any;

  beforeEach(() => {
    uiServiceSpy = jasmine.createSpy('UiService');
    responsiveServiceSpy = jasmine.createSpyObj('ResponsiveService', [], {
      currentScreenSize$: of(ScreenSize.S),
    });
    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      providers: [
        { provide: UiService, useValue: uiServiceSpy },
        { provide: ResponsiveService, useValue: responsiveServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should know the screen size', async () => {
    const res: boolean = await firstValueFrom(component.isScreenSmall$);
    expect(res).toBeTrue();
  });

  it('should know if user is authenticated', () => {});
});
