import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToasterService } from '../../services/toaster.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pending-payment-verification',
  standalone: true,
  imports: [],
  templateUrl: './pending-payment-verification.component.html',
  styleUrl: './pending-payment-verification.component.scss'
})
export class PendingPaymentVerificationComponent implements OnInit {
  constructor(
    private service: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: ToasterService
  ) {
    this.getPaymentStatus();
  }

  ngOnInit(): void {}

  getQueryParam(param:any) {
    let key;
    this.route.queryParams.subscribe((params) => {
      key = params[param];
    });
    return key;
  }

  async getPaymentStatus() {
    const orderId = this.getQueryParam("order_id");
    console.log("orderId=>", orderId);
    if (orderId) {
      this.service.paymentVerify({ orderId: orderId })
        .subscribe(
          async (response) => {
            if (response.data.order_status === "PAID") {
              await this.paymentUpdateForCashFree(
                response?.data.cf_order_id,
                orderId
              );
              // this.router.navigate(["/AppointmentConfirmed"]);
            } else {
              await this.paymentFailedUpdateForCashFree(
                response?.data.cf_order_id,
                orderId
              );
              // this.router.navigate(["/payment-failed"]);
            }
          },
          (error) => {
            console.error("Payment verification failed:", error);
          }
        );
    }
  }

  async paymentUpdateForCashFree(payId: string, orderCf: string) {
    const paymentvalue = {
      paymentId: payId,
      orderId: orderCf,
    };
    this.service.paymentUpdate(paymentvalue).subscribe(
      (response) => {
        if (response.statusCode == 200) {
          // this.snackbarService.showCustomSnackBarSuccess(response.message);
          this.router.navigate(["/AppointmentConfirmed"]);
        } else {
          this.snackbarService.openSnackBar(response.message);
        }
      },
      (error) => {
        console.error("API call failed:", error);
        this.snackbarService.openSnackBar(error);
      }
    );
  }

  async paymentFailedUpdateForCashFree(payId: string, orderCf: string) {
    const paymentvalue = {
      paymentId: payId,
      orderId: orderCf,
    };
    this.service.paymentFailed(paymentvalue).subscribe(
      (response) => {
        if (response.statusCode == 200) {
          this.router.navigate(["/payment-failed"]);
        } else {
          this.snackbarService.openSnackBar(response.message);
        }
      },
      (error) => {
        console.error("API call failed:", error);
        this.snackbarService.openSnackBar(error);
      }
    );
  }

}
