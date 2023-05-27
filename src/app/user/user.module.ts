import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddformuleComponent } from './addformule/addformule.component';
import { FormsModule } from '@angular/forms';
import { UploadcsvComponent } from './uploadcsv/uploadcsv.component';

@NgModule({
  declarations: [
    UserComponent,
    AddformuleComponent,
    UploadcsvComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule
  ]
})
export class UserModule { }
