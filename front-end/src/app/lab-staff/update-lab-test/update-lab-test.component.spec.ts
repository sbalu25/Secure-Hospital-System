import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLabTestComponent } from './update-lab-test.component';

describe('UpdateLabTestComponent', () => {
  let component: UpdateLabTestComponent;
  let fixture: ComponentFixture<UpdateLabTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLabTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLabTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
