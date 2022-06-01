import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MsexcelGeneralFunctionRoutingModule } from './msexcel-general-function-routing.module';
import { MsexcelGeneralFunctionComponent } from './msexcel-general-function.component';


@NgModule({
  declarations: [
    MsexcelGeneralFunctionComponent
  ],
  imports: [
    CommonModule,
    MsexcelGeneralFunctionRoutingModule
  ]
})
export class MsexcelGeneralFunctionModule { }
