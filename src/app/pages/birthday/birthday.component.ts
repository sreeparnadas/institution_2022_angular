import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-birthday',
  templateUrl: './birthday.component.html',
  styleUrls: ['./birthday.component.scss']
})
export class BirthdayComponent implements OnInit {
  isDeviceXS = false;
  constructor(private commonService: CommonService) {
    this.isDeviceXS=commonService.getDeviceXs();
  }

  ngOnInit(): void {
  }

}
