import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SlotBookingComponent } from './pages/slot-booking/slot-booking.component';
import { AppointmentDetailsComponent } from './pages/appointment-details/appointment-details.component';

export const routes: Routes = [
    // {
    //     path:'',component: HomeComponent
    // },
    {
        path:'',component: AppointmentDetailsComponent
    }
];
