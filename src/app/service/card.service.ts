import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardModel } from '../model/card-model';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient: HttpClient) {

   }

   getCards(): Observable<CardModel[]> {
    return this.httpClient.get<CardModel[]>('http://localhost:8080/api/libros/listar'); // Corrige la URL aquí
    }

 
    saveCards(request: any): Observable<any> {
      return this.httpClient.post<any>('http://localhost:8080/api/libros/crear', request);
    }
  
    updateCards(id: number, request: any): Observable<any> {
      return this.httpClient.put<any>('http://localhost:8080/api/libros/update/' + id, request);
    }
  
    deleteCards(id: number): Observable<any> {
      return this.httpClient.delete<any>('http://localhost:8080/api/libros/eliminar/' + id);
    }

  }
