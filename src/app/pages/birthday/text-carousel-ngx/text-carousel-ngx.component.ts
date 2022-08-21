import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";

@Component({
  selector: 'app-text-carousel-ngx',
  templateUrl: './text-carousel-ngx.component.html',
  styleUrls: ['./text-carousel-ngx.component.scss']
})
export class TextCarouselNGXComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor() { }

  ngOnInit(): void {
  }

}
