import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListTechComponent } from './list-tech/list-tech.component';
import {TableDirective} from "@coreui/angular";


@NgModule({
  declarations: [
    AdminComponent,
    ListTechComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableDirective
  ]
})
export class AdminModule { }
