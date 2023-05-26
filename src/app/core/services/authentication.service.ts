import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Technicien } from '../model/technicien';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public username: string;
  public pwd: string;
  public response: string;
  private roleSubject = new BehaviorSubject<string>('');
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: String) : any{

    return this.http.get("http://localhost:8082/SpringMVC/login/authenticate/"+username+"/"+password,{headers:{skip:"true"}, responseType: 'text' as 'json'}).subscribe(
      // @ts-ignore
      (data: string)=>{
        this.response = data;
        if(this.response != 'null'){
          localStorage.setItem("role", this.response);
          // @ts-ignore
          this.roleSubject.next(localStorage.getItem('role'))
          if(this.response == "ADMIN"){
            this.router.navigate(['/admin'])
          }
          if(this.response == "TECHNICIEN"){
            this.router.navigate(['/user'])
          }
        }
      }
    );;
  }

  register(user: Technicien){
    return this.http.post("http://localhost:8082/SpringMVC/user/registration", user, {headers:{skip:"true"}});
  }

  getRole() {
    return this.roleSubject.asObservable();
  }

}
