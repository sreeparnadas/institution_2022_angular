import {Component, ErrorHandler, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';

import { BijoyaRegistrationService } from 'src/app/services/bijoya-registration.service';
import {FormGroup, UntypedFormControl, FormControl, UntypedFormGroup, Validators} from '@angular/forms';
import { BijoyaRegistration } from 'src/app/models/bijoya-regitration.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import {CommonService} from "../../services/common.service";

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-bijoya-registration',
  templateUrl: './bijoya-registration.component.html',
  styleUrls: ['./bijoya-registration.component.scss']
})
export class BijoyaRegistrationComponent implements OnInit {
  isDeviceXS = false;
  msgs: { severity: string; summary: string; detail: string }[] = [];
  showErrorMessage: boolean = false;
  errorMessage: any;
  errors: any={};





  studentData: {

    studentId?: number;
    studentName?: string;
    email?: string;
    contactNumber?: string;
    whatsappNumber?: string;
    telegramNumber?: string;
    memberNumber?: number
  } = {};

  studentInfo: BijoyaRegistration[] = [];
  studentInfoFormGroup = new FormGroup({
    studentName: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email]),
    contactNumber: new FormControl(null, [Validators.required]),
    whatsappNumber: new FormControl(null),
    telegramNumber: new FormControl(null),
    memberNumber: new FormControl(1, [Validators.required]),
  });


  constructor(
    // private confirmationService: ConfirmationService,
    private bijoyaRegistrationService: BijoyaRegistrationService,
    // private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private commonService: CommonService,
    private errorHandler: ErrorHandler
  ) {
    this.isDeviceXS=commonService.getDeviceXs();
  }

  ngOnInit(): void {

    this.bijoyaRegistrationService.saveStudentInfo(this.studentData);

  }


  saveStudent() {


    this.confirmationService.confirm({



      message: 'Do you want to Save this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',

      accept: () => {
        console.log("test save");
        // this.studentData.studentName = this.studentInfoFormGroup.value.studentName;
        // this.studentData.email = this.studentInfoFormGroup.value.email;
        // this.studentData.contactNumber = this.studentInfoFormGroup.value.contactNumber;
        // this.studentData.whatsappNumber = this.studentInfoFormGroup.value.whatsappNumber;
        // this.studentData.telegramNumber = this.studentInfoFormGroup.value.telegramNumber;
        // this.studentData.memberNumber = this.studentInfoFormGroup.value.memberNumber;
        // console.log(this.studentData);


        this.bijoyaRegistrationService.saveStudentInfo(this.studentInfoFormGroup.value).subscribe(response => {

          if (response.success==1){
            // this.showSuccess("Record added successfully");
            // console.log(response.data);

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'successfully registered',
              // showConfirmButton: false,
              timer: 1000
            });
            this.studentInfoFormGroup.reset();
          }
        },error=>{
          console.log("test save");
          this.showErrorMessage = true;
          this.errorMessage = error.message;
          const alerts: Alert[] = [{
            type: 'success',
            message: this.errorMessage,
          }]
          setTimeout(()=>{
            this.showErrorMessage = false;
          }, 20000);
          this.showError(error.statusText);
        })
      },
      reject: () => {

        this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
    });









  }




  // confirm() {
  //   console.log("test");
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to confirm ?',
  //     header: 'Confirm !',
  //     accept:()=>{console.log("Accepted")},
  //     reject:()=>{console.log("Rejected")}
  //   });
  // }




  showSuccess(successMessage: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: successMessage});
  }
  showError(message: string) {
    this.messageService.add({severity:'error', summary: 'Success', detail: message});
  }

}
