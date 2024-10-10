import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
})
export class AppointmentDetailsComponent implements OnInit {
  patientDetails = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
  });

  details:any = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getPriceDetails();
  }

  getPriceDetails() {
    const data = {
      encryptedPhone: 'U2FsdGVkX1+BFNn/OH1m9eS6OGVgcpTdIffzTpGciSE=',
      entityId: '2',
    };
    this.apiService.getPriceDetails(data).subscribe((response) => {
      this.details = response.data;
      console.log(response);
      // handle response
    });
  }

  submit() {
    console.log(this.patientDetails.value);
    const data = {
      appointmentDate: "2024-10-11",
      customerName: this.patientDetails.value.name,
      customerPhone: this.patientDetails.value.phone,
      doctorId:1,
      entityId:"2",
      timeSlot:"08:48 AM"
    }
    this.apiService.bookSlot(data).subscribe((response) => {
console.log(response);
    })
  }
}
