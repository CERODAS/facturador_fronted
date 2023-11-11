import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { rolesModel } from '../model/roles-model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
 
  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };


   getRoles(): Observable<rolesModel[]>{
    return this.httpClient.get<rolesModel[]>('http://localhost:8080/api/rol/get').pipe(map(res => res));
   }
   


}
