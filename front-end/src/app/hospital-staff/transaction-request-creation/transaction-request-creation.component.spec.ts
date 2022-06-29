import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRequestCreationComponent } from './transaction-request-creation.component';

describe('TransactionRequestCreationComponent', () => {
  let component: TransactionRequestCreationComponent;
  let fixture: ComponentFixture<TransactionRequestCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionRequestCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRequestCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
