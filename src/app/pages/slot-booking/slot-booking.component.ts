import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-slot-booking',
  standalone: true,
  imports: [],
  templateUrl: './slot-booking.component.html',
  styleUrl: './slot-booking.component.scss'
})
export class SlotBookingComponent {
  doctors:any =[
    {
      id:1,
      entity:1222,
      name: 'Dr. Jane Smith',
      specialization: 'Cardiologist',
      img: 'doctors.png',
      experience:6
    }
  ]

  constructor(private route: Router){}

  doctorNav(){
    this.route.navigate(['/appoinment']);
  }
}
