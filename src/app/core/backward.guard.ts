import { Inject, inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanDeactivateFn,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CommonService } from '../services/common.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BackwardGuard implements CanDeactivate<any> {
constructor(private route: Router,private common: CommonService){}
details:any;

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | UrlTree |Promise<boolean | UrlTree> | boolean {
    this.details = this.common.getAppointmentDetails();
    console.log("BackwardGuard",this.details);
    this.route.navigate(['/appoinment',this.details?.uuid]);
    return true;
  } 
}
