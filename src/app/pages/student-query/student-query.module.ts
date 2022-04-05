import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentQueryRoutingModule } from './student-query-routing.module';
import { StudentQueryComponent } from './student-query.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    StudentQueryComponent
  ],
  imports: [
    CommonModule,
    StudentQueryRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentQueryModule { }
