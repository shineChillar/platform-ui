import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss'
})
export class AppointmentDetailsComponent {

  patientDetails = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
  })

  submit(){
    console.log(this.patientDetails.value);
    this.patientDetails.reset();
  }
}
