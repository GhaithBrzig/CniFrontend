import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compteur } from '../model/compteur'; // Replace with the actual path to your Compteur model

@Injectable({
  providedIn: 'root'
})
export class CompteurService {
  private apiUrl = 'http://localhost:8082/SpringMVC/Compteurs/displayCompteurs'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  getCompteurs(): Observable<Compteur[]> {
    return this.http.get<Compteur[]>(this.apiUrl);
  }
}
