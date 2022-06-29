import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeFundsComponent } from './authorize-funds.component';

describe('AuthorizeFundsComponent', () => {
  let component: AuthorizeFundsComponent;
  let fixture: ComponentFixture<AuthorizeFundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeFundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
