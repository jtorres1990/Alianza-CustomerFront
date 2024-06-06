import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/CustomerMS/searchAll';

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.response) // Extrae el array de clientes de la respuesta
    );
  }
}