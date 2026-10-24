import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';

describe('AppComponent', () => {
  const currentUser$ = new BehaviorSubject<{ email?: string; rol: string } | null>(null);
  const authService = {
    currentUser$,
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async () => {
    currentUser$.next(null);
    authService.logout.calls.reset();
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [{ provide: AuthService, useValue: authService }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render the brand without a duplicate login button for guests', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.app-brand')?.textContent).toContain('Equipo');
    expect(compiled.querySelector('.session-button')).toBeNull();
  });

  it('should offer logout for an authenticated user', () => {
    currentUser$.next({ email: 'ana@empresa.com', rol: 'alumno' });
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.session-user')?.textContent).toContain('ana@empresa.com');
    (compiled.querySelector('button.session-button') as HTMLButtonElement).click();

    expect(authService.logout).toHaveBeenCalled();
  });
});
