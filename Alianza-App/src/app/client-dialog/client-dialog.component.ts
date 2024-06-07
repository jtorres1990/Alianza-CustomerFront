import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model'; 
import { ApiResponse } from '../models/api-response.model';
import { ResponseDialogComponent } from '../response-dialog/response-dialog.component';

@Component({
  selector: 'app-client-dialog',
  templateUrl: './client-dialog.component.html',
  styleUrls: ['./client-dialog.component.css']
})
export class ClientDialogComponent implements OnInit {
  clientForm: FormGroup;
  @Output() clientSaved = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ClientDialogComponent>,
    private clientService: ClientService,
    private dialog: MatDialog
  ) {
    this.clientForm = this.fb.group({
      sharedKey: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      businessId: ['', Validators.required],
      dateAdd: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

   onSave(): void {
    if (this.clientForm.valid) {
      const newClient: Client = {
        id: 0,
        sharedKey: this.clientForm.value.sharedKey,
        businessId: this.clientForm.value.businessId,
        email: this.clientForm.value.email,
        phone: this.clientForm.value.phone,
        dateAdded: this.clientForm.value.dateAdd.toISOString()
      };

      
      this.clientService.saveClient(newClient).subscribe(
        (response: ApiResponse) => {
          this.dialog.open(ResponseDialogComponent, {
            data: {
              message: response.message,
              error: response.error
            }
          }).afterClosed().subscribe(() => {
            if (!response.error) {
              this.clientSaved.emit();
            }
            this.dialogRef.close();
          });
        },
        error => {
          console.error('Error saving client:', error);
          this.dialog.open(ResponseDialogComponent, {
            data: {
              message: 'An error occurred while saving the client.',
              error: true
            }
          });
        }
      );
    }
  }
}