import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToasterService } from '../../services/toaster.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../services/common.service';
import {MatExpansionModule} from '@angular/material/expansion';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-appoinment',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule,MatExpansionModule],
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
  minDate = this.getCurrentDate();
  uuid: any;
  entity: any;
  encryptedPhone: any;
  details: any;
  expand: boolean=true;
  constructor(
    private apiService: ApiService,
    private route: Router,
    private toaster: ToasterService,
    private commonService: CommonService,
    private router: ActivatedRoute,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      // Now you can use the id as needed
      this.uuid = params['uuid'];
      console.log('uuid', params['uuid']);
    });

    this.getEncPhoneNUm();

    this.slotDate.valueChanges.subscribe((data) => {
      this.getSlots();
      console.log(data);
    });
  }

  // Function to handle slot selection
  selectSlot(index: any) {
    if (index.booking_status === 0) {
      this.selectedSlotIndex = index;
    } else {
      console.log('test slot selection');
      this.toaster.openSnackBar('Already reserved');
    }
  }

  // Check if a slot is selected
  isSlotSelected(index: any): boolean {
    return this.selectedSlotIndex?.time_slot_id === index?.time_slot_id;
  }

  buttonClick() {
    console.log(this.selectedSlotIndex);
  }

  getProfile() {
    console.log('details', this.details);
    const data = {
      encryptedPhone: this.details.encryptedPhone,
      entityId: this.details.entityId,
    };
    this.apiService.getProfile(data).subscribe((response: any) => {
      console.log(response);
      if (response.statusCode === 200) {
        this.profileDetails = response.data;
        this.commonService.updateAppointmentDetails(response.data);
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
    // this.loader.showLoader();
    // this.apiService.getWorkSlots(data).subscribe((response: any) => {
    //   if (response.statusCode === 200) {
    //     console.log(response);
    //     this.array = response?.data?.workSlots;
    //     this.loader.hideLoader();
    //   }else {
    //     this.toaster.openSnackBar(response.message);
    //     this.loader.hideLoader();
    //   }

    // });
    this.array = {
      "morning": [
          {
              "time_slot_id": 31750,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "08:00 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-10-17T13:00:00.000Z",
              "token_number": 1,
              "session": "morning"
          },
          {
              "time_slot_id": 31751,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "08:16 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-10-17T12:40:00.000Z",
              "token_number": 2,
              "session": "morning"
          },
          {
              "time_slot_id": 31752,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "08:32 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-10-17T12:40:00.000Z",
              "token_number": 3,
              "session": "morning"
          },
          {
              "time_slot_id": 31753,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "08:48 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-09-25T00:05:11.000Z",
              "token_number": 4,
              "session": "morning"
          },
          {
              "time_slot_id": 31754,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "09:04 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-09-25T00:05:11.000Z",
              "token_number": 5,
              "session": "morning"
          },
          {
              "time_slot_id": 31755,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "09:20 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-09-25T00:05:11.000Z",
              "token_number": 6,
              "session": "morning"
          },
          {
              "time_slot_id": 31756,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "09:36 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-09-25T00:05:11.000Z",
              "token_number": 7,
              "session": "morning"
          },
          {
              "time_slot_id": 31757,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "09:52 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-09-25T00:05:11.000Z",
              "token_number": 8,
              "session": "morning"
          },
          {
              "time_slot_id": 31758,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "10:08 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-10-17T12:40:00.000Z",
              "token_number": 9,
              "session": "morning"
          },
          {
              "time_slot_id": 31759,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "10:24 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:11.000Z",
              "updatedAt": "2024-09-25T00:05:11.000Z",
              "token_number": 10,
              "session": "morning"
          },
          {
              "time_slot_id": 31760,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "10:40 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:12.000Z",
              "updatedAt": "2024-09-25T00:05:12.000Z",
              "token_number": 11,
              "session": "morning"
          },
          {
              "time_slot_id": 31761,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "10:56 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:12.000Z",
              "updatedAt": "2024-10-17T12:40:00.000Z",
              "token_number": 12,
              "session": "morning"
          },
          {
              "time_slot_id": 31762,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "11:12 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:12.000Z",
              "updatedAt": "2024-09-25T00:05:12.000Z",
              "token_number": 13,
              "session": "morning"
          },
          {
              "time_slot_id": 31763,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "11:28 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:12.000Z",
              "updatedAt": "2024-09-25T00:05:12.000Z",
              "token_number": 14,
              "session": "morning"
          },
          {
              "time_slot_id": 31764,
              "date": "2024-10-24",
              "day": "thursday",
              "time_slot": "11:44 AM",
              "doctor_id": 1,
              "booking_status": 0,
              "doctorEntityId": 1,
              "status": 1,
              "createdAt": "2024-09-25T00:05:12.000Z",
              "updatedAt": "2024-09-25T00:05:12.000Z",
              "token_number": 15,
              "session": "morning"
          }
      ],
      "evening": [
        {
          "time_slot_id": 31750,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "08:00 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-10-17T13:00:00.000Z",
          "token_number": 1,
          "session": "morning"
      },
      {
          "time_slot_id": 31751,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "08:16 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-10-17T12:40:00.000Z",
          "token_number": 2,
          "session": "morning"
      },
      {
          "time_slot_id": 31752,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "08:32 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-10-17T12:40:00.000Z",
          "token_number": 3,
          "session": "morning"
      },
      {
          "time_slot_id": 31753,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "08:48 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-09-25T00:05:11.000Z",
          "token_number": 4,
          "session": "morning"
      },
      {
          "time_slot_id": 31754,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "09:04 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-09-25T00:05:11.000Z",
          "token_number": 5,
          "session": "morning"
      },
      {
          "time_slot_id": 31755,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "09:20 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-09-25T00:05:11.000Z",
          "token_number": 6,
          "session": "morning"
      },
      {
          "time_slot_id": 31756,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "09:36 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-09-25T00:05:11.000Z",
          "token_number": 7,
          "session": "morning"
      },
      {
          "time_slot_id": 31757,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "09:52 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-09-25T00:05:11.000Z",
          "token_number": 8,
          "session": "morning"
      },
      {
          "time_slot_id": 31758,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "10:08 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-10-17T12:40:00.000Z",
          "token_number": 9,
          "session": "morning"
      },
      {
          "time_slot_id": 31759,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "10:24 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:11.000Z",
          "updatedAt": "2024-09-25T00:05:11.000Z",
          "token_number": 10,
          "session": "morning"
      },
      {
          "time_slot_id": 31760,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "10:40 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:12.000Z",
          "updatedAt": "2024-09-25T00:05:12.000Z",
          "token_number": 11,
          "session": "morning"
      },
      {
          "time_slot_id": 31761,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "10:56 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:12.000Z",
          "updatedAt": "2024-10-17T12:40:00.000Z",
          "token_number": 12,
          "session": "morning"
      },
      {
          "time_slot_id": 31762,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "11:12 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:12.000Z",
          "updatedAt": "2024-09-25T00:05:12.000Z",
          "token_number": 13,
          "session": "morning"
      },
      {
          "time_slot_id": 31763,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "11:28 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:12.000Z",
          "updatedAt": "2024-09-25T00:05:12.000Z",
          "token_number": 14,
          "session": "morning"
      },
      {
          "time_slot_id": 31764,
          "date": "2024-10-24",
          "day": "thursday",
          "time_slot": "11:44 AM",
          "doctor_id": 1,
          "booking_status": 0,
          "doctorEntityId": 1,
          "status": 1,
          "createdAt": "2024-09-25T00:05:12.000Z",
          "updatedAt": "2024-09-25T00:05:12.000Z",
          "token_number": 15,
          "session": "morning"
      }
      ]
  }
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
        this.commonService.updateAppointmentDetails(data);
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

  getEncPhoneNUm() {
    this.loader.showLoader();
    const data = {
      uuid: this.uuid,
    };
    this.apiService.getEncryPhoneNum(data).subscribe({
      next: (response: any) => {
        console.log(response);
        this.commonService.setAppointmentDetails({
          encryptedPhone: response.data.encryptedPhone,
          entityId: response.data.entityId,
        });
        this.details = this.commonService.getAppointmentDetails();
        this.encryptedPhone = response.data.encryptedPhone;
        this.entity =response.data.entityId;
        this.loader.hideLoader();
        this.getProfile();
        this.getSlots();
      },
      error: (error: any) => {
        this.loader.hideLoader();
        console.error('Error:', error);
        this.toaster.openSnackBar('Error fetching encrypted phone number');
      },
    });
  }
}
