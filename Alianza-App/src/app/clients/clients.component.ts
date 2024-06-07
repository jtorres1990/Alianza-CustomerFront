import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'sharedKey',
    'businessId',
    'email',
    'phone',
    'dateAdded',
    'edit',
  ];
  dataSource: Client[] = [];
  sharedKey: string = '';

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  openDialog(): void {
    const dialogRef: MatDialogRef<ClientDialogComponent> = this.dialog.open(
      ClientDialogComponent,
      {
        width: '400px',
      }
    );

    dialogRef.componentInstance.clientSaved.subscribe(() => {
      this.loadClients();
    });
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (clients) => {
        this.dataSource = clients;
      },
      (error) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  searchClients(): void {
    if (this.sharedKey) {
      this.clientService.searchClientsBySharedKey(this.sharedKey).subscribe(
        (response) => {
          if (!response.error) {
            this.dataSource = response.response;
          } else {
            console.error('Error in response:', response.message);
          }
        },
        (error) => {
          console.error('Error searching clients:', error);
        }
      );
    } else {
      this.loadClients();
    }
  }

  exportToCsv(): void {
    const csvData = this.convertToCSV(this.dataSource);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'clients.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  convertToCSV(data: Client[]): string {
    const headers = this.displayedColumns.filter(col => col !== 'edit');  // Excluir la columna de edición
    const rows = data.map(client => 
      headers.map(header => (client as any)[header])
    );
    return [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
  }
}
