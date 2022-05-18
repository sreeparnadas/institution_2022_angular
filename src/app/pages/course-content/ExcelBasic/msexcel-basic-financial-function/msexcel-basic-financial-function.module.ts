import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MSExcelBasicFinancialFunctionRoutingModule } from './msexcel-basic-financial-function-routing.module';
import { MSExcelBasicFinancialFunctionComponent } from './msexcel-basic-financial-function.component';
import {AccordionModule} from "primeng/accordion";


@NgModule({
  declarations: [
    MSExcelBasicFinancialFunctionComponent
  ],
  imports: [
    CommonModule,
    MSExcelBasicFinancialFunctionRoutingModule,
    AccordionModule
  ]
})
export class MSExcelBasicFinancialFunctionModule { }
