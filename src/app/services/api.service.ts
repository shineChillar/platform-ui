import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { urls } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpService) { }

getWorkSlots(data:any){
  return this.http.post(urls.getWorkSlots,data)
}

slotOnHold(data:any){
  return this.http.post(urls.slotOnHold,data)
}

getPriceDetails(data:any){
  return this.http.post(urls.getPriceDetails,data)
}

getProfile(data:any){
  return this.http.post(urls.profile,data)
}

bookSlot(data:any){
  return this.http.post(urls.bookSlot,data)
}

paymentUpdate(data:any){
  return this.http.post(urls.paymentUpdate,data)
}
}
