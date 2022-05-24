import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

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
    AccordionModule,
    // NgTemplateOutlet
  ]
})
export class MSExcelBasicFinancialFunctionModule { }
