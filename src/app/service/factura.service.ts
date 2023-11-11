import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { clienteResponse } from '../model/cliente-model';
import { productoModel } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private httpCliente: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  buscarClientePorNit(nit: any): Observable<clienteResponse[]>{
    return this.httpCliente.get<clienteResponse[]>(`http://localhost:8080/api/cliente/nit/${nit.nit}`, this.httpOptions).pipe(map(res => res));
  }

  buscarProducto(): Observable<productoModel[]> {
    return this.httpCliente.get<productoModel[]>('http://localhost:8080/api/producto').pipe(map(res => res));
  }
}
