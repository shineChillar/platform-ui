import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPaymentVerificationComponent } from './pending-payment-verification.component';

describe('PendingPaymentVerificationComponent', () => {
  let component: PendingPaymentVerificationComponent;
  let fixture: ComponentFixture<PendingPaymentVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PendingPaymentVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingPaymentVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
