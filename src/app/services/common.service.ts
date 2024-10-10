import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

appointmentDetails = {
  "appointmentId": "123456789",
  "customerName": "John Doe",
  "customerEmail": "johndoe@example.com",
  "customerPhone": "+1 123-456-7890",
  "appointmentDate": "2022-01-01",
  "appointmentTime": "10:00 AM",
  "serviceType": "Consultation",
  "serviceDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id condimentum mauris. Sed faucibus, enim ac tristique facilisis, justo felis gravida tellus, at bibendum nisi neque vel ex. Sed vel justo a erat tincidunt semper. Nullam eget condimentum nisi.",
  "status": "Pending",
  "notes": "No notes provided."
}

getAppointmentDetails(): any {
  // sessionStorage.setItem("appointmentDetails",JSON.stringify(this.appointmentDetails) )
  const Details = sessionStorage.getItem("appointmentDetails");
  if(Details) {
    this.appointmentDetails = JSON.parse(Details) 
  };
    return this.appointmentDetails;
}

updateAppointmentDetails(newDetails: any): void {
  const oldDetails = sessionStorage.getItem("appointmentDetails");
  if(oldDetails) {
    this.appointmentDetails = {...JSON.parse(oldDetails),...newDetails };
  } else {
    this.appointmentDetails = {...newDetails };
  }
  sessionStorage.setItem("appointmentDetails",JSON.stringify(this.appointmentDetails) )
}

setAppointmentDetails(newDetails: any){
  sessionStorage.setItem("appointmentDetails",JSON.stringify(newDetails))
}

}


