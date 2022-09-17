import { Component, OnInit } from '@angular/core';
import { BijoyaRegistration } from 'src/app/models/bijoya-regitration.model';
import { BijoyaRegistrationService } from 'src/app/services/bijoya-registration.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss']
})
export class OwnerComponent implements OnInit {

  registratedData: BijoyaRegistration[]=[];
  isDeviceXS = false;

  constructor( private bijoyaRegistrationService: BijoyaRegistrationService
              , private commonService: CommonService
    ) {
    this.bijoyaRegistrationService.fetchAllStudentInfo().subscribe((response) =>{
      this.registratedData = response.data;
      // console.log("get",this.registratedData);
    });
    this.isDeviceXS=commonService.getDeviceXs();
   }

  ngOnInit(): void {
   
  }

}
