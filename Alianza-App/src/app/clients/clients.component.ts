import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';
import { MatDialog } from '@angular/material/dialog';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'sharedKey', 'businessId', 'email', 'phone', 'dateAdded', 'edit'];
  dataSource = new MatTableDataSource<Client>();

  constructor(private clientService: ClientService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      clients => {
        this.dataSource.data = clients;
      },
      error => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ClientDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Client data:', result);
        // Aquí puedes manejar la lógica para guardar el nuevo cliente
      }
    });
  }
}