import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseContentComponent } from './course-content.component';
import {CourseContentHomeComponent} from "./course-content-home/course-content-home.component";

const routes: Routes = [
                        { path: '',
                          component: CourseContentComponent,
                          children: [
                            { path: '', component: CourseContentHomeComponent },
                            { path: 'CourseContentExcel', loadChildren: () => import('./course-content-excel/course-content-excel.module').then(m =>m.CourseContentExcelModule) }
                          ]
                        }
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseContentRoutingModule { }
