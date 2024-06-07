import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { ApiResponse } from '../models/api-response.model';
import {HttpApi} from '../models/http-api';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
 

  constructor(private http: HttpClient) { }

  getClients(): Observable<Client[]> {
    return this.http.get<ApiResponse>(HttpApi.GET_CLIENTS).pipe(
      map(response => response.response) // Extrae el array de clientes de la respuesta
    );
  }

  saveClient(client: Client): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(HttpApi.POST_SAVE_CUSTOMER, client);
  }

  searchClientsBySharedKey(sharedKey: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${HttpApi.GET_CLIENTS_BY_SHARED_KEY}/${sharedKey}`);
  }
}