import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddformuleComponent } from './addformule/addformule.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadcsvComponent } from './uploadcsv/uploadcsv.component';
import { PredictComponent } from './predict/predict.component';

@NgModule({
  declarations: [
    UserComponent,
    AddformuleComponent,
    UploadcsvComponent,
    PredictComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
