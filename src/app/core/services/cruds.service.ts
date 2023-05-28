import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CrudsService {

  public url = 'http://localhost:8082/SpringMVC/technicien';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any[]>(this.url +'/Display');
  }

  delete(id: number) {
    return this.http.delete(this.url + '/Remove/' + id);
  }
}
