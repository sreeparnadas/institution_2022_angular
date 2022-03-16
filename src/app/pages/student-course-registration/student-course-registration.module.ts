import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgSelectModule} from "@ng-select/ng-select";
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { StudentCourseRegistrationRoutingModule } from './student-course-registration-routing.module';
import { StudentCourseRegistrationComponent } from './student-course-registration.component';



@NgModule({
  declarations: [
    StudentCourseRegistrationComponent
  ],
  imports: [
    CommonModule,
    StudentCourseRegistrationRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StudentCourseRegistrationModule { }
