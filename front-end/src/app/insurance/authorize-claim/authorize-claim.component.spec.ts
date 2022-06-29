import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeClaimComponent } from './authorize-claim.component';

describe('AuthorizeClaimComponent', () => {
  let component: AuthorizeClaimComponent;
  let fixture: ComponentFixture<AuthorizeClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeClaimComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
