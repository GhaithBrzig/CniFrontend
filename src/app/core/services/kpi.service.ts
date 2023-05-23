import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kpi } from '../model/kpi'; // Replace with the actual path to your KPI model

@Injectable({
  providedIn: 'root'
})
export class KpiService {
  private apiUrl = 'http://localhost:8082/SpringMVC/Kpis/displaykpis'; // Replace with your API endpoint URL

  constructor(private http: HttpClient) { }

  getKpis(): Observable<Kpi[]> {
    return this.http.get<Kpi[]>(this.apiUrl);
  }
  getKpiById(kpiIds:Number): Observable<Kpi> {
    const url = `${this.apiUrl}/${kpiIds}`;
    return this.http.get<Kpi>(url);
  }
 
  
}
