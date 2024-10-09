import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppoinmentComponent } from './pages/appoinment/appoinment.component';
import { AppointmentDetailsComponent } from './pages/appointment-details/appointment-details.component';

export const routes: Routes = [
    {
        path: "",component:AppoinmentComponent
    },
    {
        path: "appointment-details",component:AppointmentDetailsComponent
    }
];
