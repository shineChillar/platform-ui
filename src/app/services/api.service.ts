import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { urls } from '../core/constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpService) { }

getWorkSlots(data:any){
  return this.http.post(urls.getWorkSlots,)
}

slotOnHold(data:any){
  return this.http.post(urls.slotOnHold,data)
}

getPriceDetails(data:any){
  return this.http.post(urls.getPriceDetails,data)
}

}
