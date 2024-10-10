import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }
  private loaderVisibility = new BehaviorSubject<boolean>(false);

  private loaderText = new BehaviorSubject<string>('');
  public loaderText$ = this.loaderText.asObservable();


  get loaderVisibility$() {
    return this.loaderVisibility.asObservable();
  }

  showLoader(text: string = '') {
    this.loaderVisibility.next(true);
    console.log('in service')
    this.loaderText.next(text);
  }

  hideLoader() {
    this.loaderVisibility.next(false);
  }
}
