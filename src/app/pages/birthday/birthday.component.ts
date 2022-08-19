import {Component, HostListener, OnInit} from '@angular/core';
import { Picture } from 'src/app/models/picture.model';
import { PhotoService} from 'src/app/services/photo.service';
import {CommonService} from "../../services/common.service";



@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss']
})
export class BirthdayComponent implements OnInit {
  isDeviceXS = false;
  products: Picture[] =[];

  constructor(private commonService: CommonService, private photoService: PhotoService) {
    this.isDeviceXS=commonService.getDeviceXs();
  }

  ngOnInit(): void {
    this.photoService.getImages().then(products => {
      this.products = products;
    });
  }

}
