import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextCarouselNGXRoutingModule } from './text-carousel-ngx-routing.module';
import { TextCarouselNGXComponent } from './text-carousel-ngx.component';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";



@NgModule({
  declarations: [
    TextCarouselNGXComponent
  ],
  exports: [
    TextCarouselNGXComponent
  ],
  imports: [
    CommonModule,
    TextCarouselNGXRoutingModule,
    CarouselModule,
  ]
})
export class TextCarouselNGXModule {

}
