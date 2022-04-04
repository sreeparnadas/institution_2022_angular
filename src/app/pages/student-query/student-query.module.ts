import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentQueryRoutingModule } from './student-query-routing.module';
import { StudentQueryComponent } from './student-query.component';


@NgModule({
  declarations: [
    StudentQueryComponent
  ],
  imports: [
    CommonModule,
    StudentQueryRoutingModule
  ]
})
export class StudentQueryModule { }
