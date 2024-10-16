import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [],
  templateUrl: './payment-failed.component.html',
  styleUrl: './payment-failed.component.scss'
})
export class PaymentFailedComponent {
  DocId: any;
  businessId: any;

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {}

  close() {
    // this.router.navigate(['/home']); // Assuming '/' is the route for the home page
    this.router.navigate(["/doctor"], {
      queryParams: { id: this.DocId, entity: this.businessId },
    });
  }
}
