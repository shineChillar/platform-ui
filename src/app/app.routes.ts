import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppoinmentComponent } from './pages/appoinment/appoinment.component';
import { AppointmentDetailsComponent } from './pages/appointment-details/appointment-details.component';
import { SlotBookingComponent } from './pages/slot-booking/slot-booking.component';
import { AppointmentConfirmedComponent } from './pages/appointment-confirmed/appointment-confirmed.component';
import { PaymentFailedComponent } from './pages/payment-failed/payment-failed.component';
import { PendingPaymentVerificationComponent } from './pages/pending-payment-verification/pending-payment-verification.component';
import { BackwardGuard } from './core/backward.guard';

export const routes: Routes = [
    {
        path: "",component:SlotBookingComponent
    },
    {
        path:"appoinment/:uuid",component:AppoinmentComponent
    },
    {
        path: "appointment-details",component:AppointmentDetailsComponent
    },
    {
        path: "AppointmentConfirmed",component: AppointmentConfirmedComponent
    },
    {
        path: "payment-failed",component: PaymentFailedComponent
    },
    {
        path: "verify-payment",component: PendingPaymentVerificationComponent
    }
];
