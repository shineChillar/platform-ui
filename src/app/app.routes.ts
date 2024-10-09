import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppoinmentComponent } from './pages/appoinment/appoinment.component';
import { AppointmentDetailsComponent } from './pages/appointment-details/appointment-details.component';
import { SlotBookingComponent } from './pages/slot-booking/slot-booking.component';

export const routes: Routes = [
    {
        path: "",component:SlotBookingComponent
    },
    {
        path:"appoinment",component:AppoinmentComponent
    },
    {
        path: "appointment-details",component:AppointmentDetailsComponent
    }
];
