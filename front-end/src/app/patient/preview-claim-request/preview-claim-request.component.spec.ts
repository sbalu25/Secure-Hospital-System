import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewClaimRequestComponent } from './preview-claim-request.component';

describe('PreviewClaimRequestComponent', () => {
  let component: PreviewClaimRequestComponent;
  let fixture: ComponentFixture<PreviewClaimRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewClaimRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewClaimRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
