import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddformuleComponent } from './addformule/addformule.component';

@NgModule({
  declarations: [
    UserComponent,
    AddformuleComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ]
})
export class UserModule { }
