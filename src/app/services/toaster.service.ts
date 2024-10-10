import { inject, Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  public snackbar = inject(MatSnackBar); //
  constructor() { }

  openSnackBar(message: string="") {
    this.snackbar.open(message,'', {
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass:['red-snackbar'],
      duration:1000
    });
  }
}
