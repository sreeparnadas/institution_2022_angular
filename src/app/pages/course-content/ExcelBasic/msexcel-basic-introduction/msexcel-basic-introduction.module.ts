import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MSExcelBasicIntroductionRoutingModule } from './msexcel-basic-introduction-routing.module';
import { MSExcelBasicIntroductionComponent } from './msexcel-basic-introduction.component';


@NgModule({
  declarations: [
    MSExcelBasicIntroductionComponent
  ],
  imports: [
    CommonModule,
    MSExcelBasicIntroductionRoutingModule
  ]
})
export class MSExcelBasicIntroductionModule { }
