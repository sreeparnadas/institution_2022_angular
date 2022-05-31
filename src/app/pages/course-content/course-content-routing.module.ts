import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseContentComponent } from './course-content.component';
import {CourseContentHomeComponent} from "./course-content-home/course-content-home.component";

const routes: Routes = [
                        { path: '',
                          component: CourseContentComponent,
                          children: [
                            { path: '', component: CourseContentHomeComponent },

                            { path: 'CourseContentExcel', loadChildren: () => import('./course-content-excel/course-content-excel.module').then(m =>m.CourseContentExcelModule) },

                            { path: 'MSExcelBasicIntroduction', loadChildren: () => import('./ExcelBasic/msexcel-basic-introduction/msexcel-basic-introduction.module').then(m =>m.MSExcelBasicIntroductionModule) },

                            { path: 'MSExcelBasicFinancialFunction', loadChildren: () => import('./ExcelBasic/msexcel-basic-financial-function/msexcel-basic-financial-function.module').then(m =>m.MSExcelBasicFinancialFunctionModule) },

                            { path: 'MSExcelBasicLookupFunction', loadChildren: () => import('./ExcelBasic/msexcel-basic-lookup-function/msexcel-basic-lookup-function.module').then(m =>m.MsexcelBasicLookupFunctionModule) }
                          ]
                        }
                       ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseContentRoutingModule { }
