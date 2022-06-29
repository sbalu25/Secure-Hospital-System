import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundsDispersalComponent } from './funds-dispersal.component';

describe('FundsDispersalComponent', () => {
  let component: FundsDispersalComponent;
  let fixture: ComponentFixture<FundsDispersalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundsDispersalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundsDispersalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
