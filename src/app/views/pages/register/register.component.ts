import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Technicien} from "../../../core/model/technicien";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public form: FormGroup;
  public action: String;
  public technicien: Technicien;
  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private currentRoute: ActivatedRoute,
               private auth: AuthenticationService) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      prenom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
      this.technicien = new Technicien();
    }


  submit() {
      this.auth.register(this.technicien).subscribe({
        next: () => {
          this.router.navigate(['login'])
        },
        error: (error) => {
          console.log(error)
        },
        complete: () => {
          console.log("complete")
        }
      });


  }
}
