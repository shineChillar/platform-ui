import { Component } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { ApiService } from '../../services/api.service';
import Swal from "sweetalert2";
import html2canvas from "html2canvas";
import { Router } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-appointment-confirmed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-confirmed.component.html',
  styleUrl: './appointment-confirmed.component.scss',
})
export class AppointmentConfirmedComponent {
  booking_details: any;
  whatsapp_message_1!: string;
  whatsapp_message_2!: string;
  DocId: any;
  businessId: any;
  basicDetails: any;


  constructor(private service: ApiService,
     private toaster: ToasterService,
    private router: Router,
  private commonService: CommonService) {
    this.businessId = "12345";
    this.DocId = "67890";
  }

ngOnInit(){
  this.basicDetails = this.commonService.getAppointmentDetails();
this.getAppointment();
}

  getAppointment() {
    const data = {
      bookingId: this.basicDetails.bookingId ,
      // bookingId: 2
    };

    this.service.bookingConfirmationDate(data)
      .subscribe(
        (response) => {
          // console.log(`order details`, response);
          if (response.statusCode === 200) {
            //   this.orderDetails = response.data.orderData
            this.booking_details = response.data;
            this.whatsapp_message_1 =
              "Dear \n" + this.booking_details.customerName + ",";
            this.whatsapp_message_2 =
              " We are pleased to confirm your appointment with " +
              this.booking_details.doctorName +
              " on " +
              this.booking_details.appointmentDate +
              " at " +
              this.booking_details.appointmentTimeSlot +
              ".";
            console.log("success");
          } else if (response.statusCode === 400) {
            this.toaster.openSnackBar(response.message);
          }
        },
        (error) => {
          // Handle the error response
          console.error("API call failed:", error);
          this.toaster.openSnackBar(error);
        }
      );
  }

  share() {
    Swal.fire({
      title: "Share",
      html: `
        <a href="https://wa.me/+91${this.booking_details.bookedPhoneNo}?text=${encodeURIComponent(this.whatsapp_message_1 + this.whatsapp_message_2)}" target="_blank">
          <i class="fa-brands fa-whatsapp" style="font-size:80px;color:green;padding:8px;"></i>
        </a>
        <p>Click the WhatsApp icon to share!</p>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: 'auto',
      padding: '20px',
    });
  }
  


  captureEntirePage() {
    const cardElement = document.getElementById("cardToCapture");

    if (!html2canvas) {
      console.error("html2canvas is not available.");
      return;
    }


    // Use options to handle CORS issues on iOS
    const options = {
      useCORS: true,
      allowTaint: true,
    };

    // Capture screenshot
    if (cardElement){
    html2canvas(cardElement, options)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");

        // Create a link element to trigger the download of the image
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "appointment_booking.png";
        a.click();
      })
      .catch((error) => {
        console.error("Error capturing screenshot:", error);
        // Handle errors or provide feedback to the user
      });
    }
  }

  close() {
    // this.router.navigate(['/home']); // Assuming '/' is the route for the home page
    this.router.navigate(["/doctor"], {
      queryParams: { id: this.DocId, entity: this.businessId },
    });
  }

}
