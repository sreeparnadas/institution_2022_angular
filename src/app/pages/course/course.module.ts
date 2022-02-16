import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import {ToastModule} from "primeng/toast";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatStepperModule} from "@angular/material/stepper";
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import {EditorModule} from "primeng/editor";
@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ToastModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    ButtonModule,
    RippleModule,
    EditorModule
  ]
})
export class CourseModule { }
