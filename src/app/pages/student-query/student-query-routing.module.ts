import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentQueryComponent } from './student-query.component';

const routes: Routes = [{ path: '', component: StudentQueryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentQueryRoutingModule { }
