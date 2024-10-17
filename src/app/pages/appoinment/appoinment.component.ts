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
    this.loader.showLoader();
    this.apiService.getWorkSlots(data).subscribe((response: any) => {
      if (response.statusCode === 200) {
        console.log(response);
        this.array = response?.data?.workSlots;
        this.loader.hideLoader();
      }else {
        this.toaster.openSnackBar(response.message);
        this.loader.hideLoader();
      }

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
