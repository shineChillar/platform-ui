import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentConfirmedComponent } from './appointment-confirmed.component';

describe('AppointmentConfirmedComponent', () => {
  let component: AppointmentConfirmedComponent;
  let fixture: ComponentFixture<AppointmentConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentConfirmedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
