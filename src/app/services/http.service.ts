import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http :HttpClient) { }

  
  baseURL = "https://booking.chillarpayments.com/uat/backend"
  

  post(url: string, data: any = {}): Observable<any | any[]> {
    return this.http.post(this.baseURL + url, data);
  }

  put(url: string, data: any = {}): Observable<any | any[]> {
    return this.http.put(this.baseURL + url, data);
  }

  patch(url: string, data: any = {}): Observable<any | any[]> {
    return this.http.patch(this.baseURL + url, data);
  }

  get(url: string): Observable<any | any[]> {
    return this.http.get(this.baseURL + url);
  }

  delete(url: string): Observable<any | any[]> {
    return this.http.delete(this.baseURL + url);
  }


}
