import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(private snackBar: MatSnackBar) {}

  show3secSnackBar(message: string): void {
    this.snackBar.open(message, undefined, { duration: 3000 });
  }
}
