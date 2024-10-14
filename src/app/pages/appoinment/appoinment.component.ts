import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToasterService } from '../../services/toaster.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-appoinment',
  standalone: true,
  imports: [RouterOutlet, CommonModule,ReactiveFormsModule],
  templateUrl: './appoinment.component.html',
  styleUrls: ['./appoinment.component.scss'],
  animations: [
    // trigger('fadeInOut', [
    //   transition(':enter', [
    //     style({ opacity: 0 }),
    //     animate('300ms 200ms', style({ opacity: 1 }))
    //   ]),
    //   transition(':leave', [
    //     animate('200ms', style({ opacity: 0 }))
    //   ])
    // ])
  ],
})
export class AppoinmentComponent implements OnInit {
  array: any = [];

  selectedSlotIndex: any = [];
  profileDetails: any = [];
  slotDate = new FormControl(this.getCurrentDate());
  minDate = this.getCurrentDate()
details: any 
  constructor(
    private apiService: ApiService,
    private route: Router,
    private toaster: ToasterService,
    private commonService: CommonService,

  ) {}

  ngOnInit() {

    this.commonService.setAppointmentDetails({
      encryptedPhone: 'U2FsdGVkX1+BFNn/OH1m9eS6OGVgcpTdIffzTpGciSE=',
      entityId: '2',
    })

this.details = this.commonService.getAppointmentDetails()

this.slotDate.valueChanges.subscribe(data => {
  this.getSlots();
  console.log(data)
})

    this.getProfile();
    this.getSlots();
  }

  // Function to handle slot selection
  selectSlot(index: any) {
    this.selectedSlotIndex = index;
  }

  // Check if a slot is selected
  isSlotSelected(index: any): boolean {
    return this.selectedSlotIndex?.number === index?.number;
  }

  buttonClick() {
    console.log(this.selectedSlotIndex);
  }

  getProfile() {
    console.log("details",this.details);
    const data = {
      encryptedPhone: this.details.encryptedPhone,
      entityId: this.details.entityId,
    };
    this.apiService.getProfile(data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.profileDetails = response.data;
        this.commonService.updateAppointmentDetails(response.data)
      } else {
        this.toaster.openSnackBar(response.message);
      }

    });
  }

  getSlots() {
    const data = {
      date: this.slotDate.value,
      encryptedPhone: this.details.encryptedPhone,
      entityId: this.details.entityId,
    };
    this.apiService.getWorkSlots(data).subscribe((response: any) => {
      console.log(response);
      this.array = response?.data?.workSlots;
    });
  }

  holdSlot() {
    const data = {
      appointmentDate: this.slotDate.value,
      encryptedPhone: this.details.encryptedPhone,
      entityId: this.details.entityId,
      timeSlot: this.selectedSlotIndex?.time_slot,
    };
    this.apiService.slotOnHold(data).subscribe((response: any) => {
      if (response.statusCode === 200) {
        this.commonService.updateAppointmentDetails(data)
        this.route.navigate(['appointment-details']);
      } else {
        this.toaster.openSnackBar(response.message);
      }
      console.log(response);
    });
  }

  getCurrentDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
