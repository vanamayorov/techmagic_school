import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyBarService {

  constructor(private snackBar: MatSnackBar) { }

  notify(message: string) {
    this.snackBar.open(message, "Close", {
      duration: 2000,
      horizontalPosition: 'right'
    });
  }
}
