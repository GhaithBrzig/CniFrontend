import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class CsvService {

  public url = 'http://localhost:8082/SpringMVC/product';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(this.url);
  }


}
