import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';

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

  constructor(private route: Router, private commonService : CommonService){}

  ngOnInit(){
const params =this.commonService.getAppointmentDetails();
console.log("paramsp",params)
this.commonService.updateAppointmentDetails({test:123})
const paramss =this.commonService.getAppointmentDetails();
console.log("params2",paramss)
  }
  doctorNav(){
    this.route.navigate(['/appoinment']);
  }
}
