import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { productoModel } from '../model/producto.model'; 

import { CategoriaModel } from '../model/categoria.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getProducto(): Observable<productoModel[]>{
    return this.httpClient.get<productoModel[]>('http://localhost:8081/api/producto').pipe(map(res => res));
   }

   postProducto(request: any): Observable<any>{
    debugger;
    return this.httpClient.post<any>('http://localhost:8081/api/producto', request, this.httpOptions).pipe(map(res => res));
   }

   putProducto(request: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:8081/api/producto', request, this.httpOptions).pipe(map(res => res));
   }

   deleteProducto(id_producto: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8081/api/producto/delete/${id_producto.id_producto}`, this.httpOptions).pipe(map(res => res));
   }


   getCategorias(): Observable<CategoriaModel[]> {
    return this.httpClient.get<CategoriaModel[]>('http://localhost:8081/api/categoria').pipe(map(res => res));
  }

}
