import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'sharedKey', 'businessId', 'email', 'phone', 'dateAdded', 'edit'];
  dataSource = new MatTableDataSource<Client>();

  constructor(private clientService: ClientService) { }

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
}