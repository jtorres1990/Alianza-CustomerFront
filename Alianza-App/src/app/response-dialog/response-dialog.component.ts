import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrls: ['./response-dialog.component.css']
})
export class ResponseDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string, error: boolean },
    private dialogRef: MatDialogRef<ResponseDialogComponent>
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}