import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  const mockedAuthService = jasmine.createSpyObj('AuthService', ['createUser', 'logout'], { isAuthenticated$: of(true) });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: mockedAuthService }]
    });
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const lougoutLink = fixture.debugElement.query(By.css('li:nth-child(3) a'));
    expect(lougoutLink).withContext('Not logged in').toBeTruthy();


    // const liElements = fixture.debugElement.queryAll(By.css('ul li'));
    // const thirdLi = liElements[2]; // 0-based index
    // expect(thirdLi.nativeElement.textContent).toContain('Logout');

    // const logoutLink = fixture.debugElement.query(By.css('a[href="#"]'));
    // expect(logoutLink.nativeElement.textContent).toContain('Logout');

    lougoutLink.triggerEventHandler('click');

    const service = TestBed.inject(AuthService);

    expect(service.logout).withContext('Could not click logout link').toHaveBeenCalledTimes(1);
  })
});
