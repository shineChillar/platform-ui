import { Component, NgZone, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
//@ts-ignore
import {load} from '@cashfreepayments/cashfree-js';

declare var Razorpay: any;

@Component({
  selector: 'app-appointment-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './appointment-details.component.html',
  styleUrl: './appointment-details.component.scss',
})
export class AppointmentDetailsComponent implements OnInit {
  patientDetails = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
  });

  details: any = [];
  basicDetails: any = [];
  bookingData: any = [];

  

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
    private toaster: ToasterService,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    this.basicDetails = this.commonService.getAppointmentDetails();
    this.getPriceDetails();
  }

  getPriceDetails() {
    const data = {
      encryptedPhone: this.basicDetails.encryptedPhone,
      entityId: this.basicDetails.entityId,
    };
    this.apiService.getPriceDetails(data).subscribe((response) => {
      this.details = response.data;
      console.log(response);
      // handle response
    });
  }

  async submit() {
    console.log(this.patientDetails.value);
    const data = {
      appointmentDate: '2024-10-11',
      customerName: this.patientDetails.value.name,
      customerPhone: this.patientDetails.value.phone,
      doctorId: this.basicDetails.doctor_id,
      entityId: '2',
      timeSlot: '08:48 AM',
    };

    if (this.patientDetails.valid) {
      const formValue = {
        doctorId: this.basicDetails.doctor_id,
        appointmentDate: this.basicDetails.appointmentDate,
        timeSlot: this.basicDetails.timeSlot,
        customerName: this.patientDetails.value.name,
        customerPhone: this.patientDetails.value.phone?.toString(),
        entityId: this.basicDetails.entityId,
      };
      try {
        const response = await this.apiService.bookSlot(formValue).toPromise();

        if (response.statusCode == 200) {
          // this.snackbarService.showCustomSnackBarSuccess(response.message);
          this.bookingData.bookingData = response.data;

          if (response.data.amount == 0) {
            const paymentvalue = {
              paymentId: response.data.payment_session_id,
              orderId: response.data.orderId,
            };
            const resBook = await this.apiService
              .paymentUpdate(paymentvalue)
              .toPromise();

            if (resBook.statusCode == 200) {
              // console.log("Booking confirmed");
              this.router.navigate(['/AppointmentConfirmed']);
            }
          } else {
            //comment to disable the PG
            if (response.data.currentPg == 1) {
              this.initiateRazorpay(
                response.data.orderId,
                response.data.amount
              );
            } else if (response.data.currentPg == 2) {
              this.cashfreeCreateorder(
                response.data.orderId,
                response.data.payment_session_id
              );
            }
          }
        } else {
          this.toaster.openSnackBar(response.message);
        }
      } catch (error) {
        console.error('API call failed:', error);
        this.toaster.openSnackBar('Something failed. Please try again');
      }
    } else {
      this.toaster.openSnackBar('Please fill the form');
    }
  }


  initiateRazorpay(orderId: string, amount: number) {
    const options = {
      key: this.commonService.razorpayKey,
      amount: amount * 100,
      currency: "INR",
      name: this.basicDetails.doctor_name,
      description: "Appointment Booking",
      image: "",
      order_id: orderId,
      handler: (response: any) => {
        console.log("payemnt responseeeeeeeee", response);
        this.ngZone.run(() => {
          if (response.razorpay_payment_id) {
            console.log("Payment successful");
            const paymentvalue = {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            };

            this.apiService.paymentUpdate(paymentvalue).subscribe(
                (response) => {
                  console.log("RazorRES=>>", response);

                  if (response.statusCode == 200) {
                    // this.snackbarService.showCustomSnackBarSuccess(response.message);
                    this.router.navigate(["/AppointmentConfirmed"]);
                  } else {
                    this.router.navigate(["/payment-failed"]);
                    // this.snackbarService.showCustomSnackBarError(
                    //   response.message
                    // );
                  }
                },
              );
          } else {
            console.log("Payment failed or was canceled");
          }
        });
      },
      prefill: {
        name: "",
        contact: this.patientDetails.value.phone,
        email: "your@email.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.type = "text/javascript";
    script.async = false;
    document.head.appendChild(script);

    // script.onload = () => {
    //   const rzp = new Razorpay(options);
    //   rzp.open();
    // };

    script.onload = () => {
      try {
        const rzp = new Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Failed to initialize Razorpay:", error);
      }
    };

    script.onerror = () => {
      console.error("Failed to load Razorpay script");
    };
  }

  async cashfreeCreateorder(orderId: string, payment_session_id: string) {
    let cashfree = await load({
      mode: "production",
    });

    let checkoutOptions = {
      paymentSessionId: payment_session_id,
      redirectTarget: "_self",
    };
    cashfree.checkout(checkoutOptions);
  }
}
