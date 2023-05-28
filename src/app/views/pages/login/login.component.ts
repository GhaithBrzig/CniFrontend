import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/services/authentication.service";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username: string;
  public pwd: string;
  public response: string;

  constructor( private authService: AuthenticationService,
               private router: Router) { }


  submit(){
    this.authService.login(this.username, this.pwd)
    localStorage.setItem("username", this.username);
    localStorage.setItem("password", this.pwd);
  }

}
