import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';
import { usuarioModel } from '../model/usuario-model';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
 
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getUsuario(): Observable<usuarioModel[]>{
    return this.httpClient.get<usuarioModel[]>('http://localhost:8080/api/usuario').pipe(map(res => res));
  }

  postUsuario(request: any): Observable<any>{
    debugger;
    return this.httpClient.post<any>('http://localhost:8080/api/usuario/post', request, this.httpOptions).pipe(map(res => res));
  }

  putUsuario(request: any): Observable<any>{
    debugger;
    return this.httpClient.put<any>('http://localhost:8080/api/usuario/put', request, this.httpOptions).pipe(map(res => res));
  } 

  deleteUsuario(id_usuario: any): Observable<any>{
    return this.httpClient.put<any>(`http://localhost:8080/api/usuario/delete/${id_usuario.id_usuario}`, this.httpOptions).pipe(map(res => res));
   }


}
