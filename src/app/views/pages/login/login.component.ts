import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../core/services/authentication.service";

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
    this.authService.login(this.username, this.pwd).subscribe(
      (data: string)=>{
        this.response = data;
        if(this.response != 'null'){
          localStorage.setItem("username", this.username);
          localStorage.setItem("password", this.pwd);
          localStorage.setItem("role", this.response);
          if(this.response == "ADMIN"){
            this.router.navigate(['/admin'])
          }
          if(this.response == "TECHNICIEN"){
            this.router.navigate(['/user'])
          }
        }
      }
    );

  }

}
