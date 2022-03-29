import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseContentRoutingModule } from './course-content-routing.module';
import { CourseContentComponent } from './course-content.component';
import {ButtonModule} from "primeng/button";


@NgModule({
  declarations: [
    CourseContentComponent
  ],
  imports: [
    CommonModule,
    CourseContentRoutingModule,
    ButtonModule
  ]
})
export class CourseContentModule { }
