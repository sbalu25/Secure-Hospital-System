import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalStaffComponent } from './hospital-staff.component';

describe('HospitalStaffComponent', () => {
  let component: HospitalStaffComponent;
  let fixture: ComponentFixture<HospitalStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HospitalStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
