import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatTabsModule } from '@angular/material/tabs';
import {ChartModule} from "./chart/chart.module";
import {TopModule} from "./top/top.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        MatTabsModule,
        ChartModule,
        TopModule,
    ]
})
export class HomeModule { }
