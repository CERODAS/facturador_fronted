import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { clienteModel } from '../model/cliente-model';

import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private httpClient: HttpClient) {

   }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

   getCliente(): Observable<clienteModel[]>{
    return this.httpClient.get<clienteModel[]>('http://localhost:8080/api/cliente').pipe(map(res => res));
   }

   postCliente(request: any): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/api/cliente', request, this.httpOptions).pipe(map(res => res));
   }

   putCliente(request: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:8080/api/cliente', request, this.httpOptions).pipe(map(res => res));
   }

   deleteCliente(id_cliente: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8080/api/cliente/delete/${id_cliente.id_cliente}`, this.httpOptions).pipe(map(res => res));
   }
}
