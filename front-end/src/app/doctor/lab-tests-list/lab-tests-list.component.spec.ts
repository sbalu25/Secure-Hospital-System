import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestsListComponent } from './lab-tests-list.component';

describe('LabTestsListComponent', () => {
  let component: LabTestsListComponent;
  let fixture: ComponentFixture<LabTestsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabTestsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabTestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
