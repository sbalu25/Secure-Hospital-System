import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestRequestsComponent } from './lab-test-requests.component';

describe('LabTestRequestsComponent', () => {
  let component: LabTestRequestsComponent;
  let fixture: ComponentFixture<LabTestRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabTestRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabTestRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
