import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { CategoriaModel } from '../model/categoria.model';


import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private httpClient: HttpClient) { }


  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCatetoria(): Observable<CategoriaModel[]>{
    return this.httpClient.get<CategoriaModel[]>('http://localhost:8080/api/categoria').pipe(map(res=>res));
  } 

  postCategoria(request: any): Observable<any>{ 
    debugger;
    return this.httpClient.post<any>('http://localhost:8080/api/categoria', request, this.httpOptions).pipe(map(res => res));
  }

  putCategoria(request: any): Observable<any>{
    return this.httpClient.put<any>('http://localhost:8080/api/categoria', request, this.httpOptions).pipe(map(res => res));
  }

  deleteCategoria(id_categoria: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8080/api/categoria/delete/${id_categoria.id_categoria}`, this.httpOptions).pipe(map(res => res));
   }
}
