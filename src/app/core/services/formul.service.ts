import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formule } from '../model/formule';

@Injectable({
  providedIn: 'root'
})
export class FormuleService {
  private baseUrl = 'http://localhost:8082/SpringMVC';

  constructor(private http: HttpClient) { }

  getAllFormules(): Observable<Formule[]> {
    return this.http.get<Formule[]>(`${this.baseUrl}/Formules/display`);
  }

  addFormule(formule: Formule): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/Formules/addFormules`, formule);
  }  

  getFormuleById(id: number): Observable<Formule> {
    return this.http.get<Formule>(`${this.baseUrl}/Formules/display/detailequipe/${id}`);
  }

  updateFormule(id: number, formule: Formule): Observable<Formule> {
    return this.http.put<Formule>(`${this.baseUrl}/Formules/updateFormules/${id}`, formule);
  }

  deleteFormule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Formules/delete/${id}`);
  }
}
