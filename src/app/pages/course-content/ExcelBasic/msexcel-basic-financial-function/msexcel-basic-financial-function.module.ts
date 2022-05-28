import { NgModule } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

import { MSExcelBasicFinancialFunctionRoutingModule } from './msexcel-basic-financial-function-routing.module';
import { MSExcelBasicFinancialFunctionComponent } from './msexcel-basic-financial-function.component';
import {AccordionModule} from "primeng/accordion";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FieldsetModule} from 'primeng/fieldset';
import {DividerModule} from 'primeng/divider';


@NgModule({
  declarations: [
    MSExcelBasicFinancialFunctionComponent
  ],
  imports: [
    CommonModule,
    MSExcelBasicFinancialFunctionRoutingModule,
    AccordionModule,
    ToastModule,
    ButtonModule,
    FieldsetModule,
    DividerModule
    // NgTemplateOutlet
  ]
})
export class MSExcelBasicFinancialFunctionModule { }
