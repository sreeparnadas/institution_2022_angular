import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StudentQueryService} from "../../services/student-query.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {DatePipe} from "@angular/common";

interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-student-query',
  templateUrl: './student-query.component.html',
  styleUrls: ['./student-query.component.scss'],
  providers: [ConfirmationService, MessageService,DatePipe]
})
export class StudentQueryComponent implements OnInit {

  myControl = new FormControl();
  //
  studentQueryForm : any;
  showErrorMessage: boolean = false;
  errorMessage: any;
  queryData : {
    id?: any;
    student_name?:string;
    address?:string;
    father_name?:string;
    mother_name?:string;
    guardian_name?:string;
    relation_to_guardian?:string;
    educational_institution?:string;
    phone_number?:string;
    query?:string;
  }={};

  msgs: { severity: string; summary: string; detail: string }[] = [];

  constructor(private studentQueryService : StudentQueryService, private confirmationService: ConfirmationService
              , private messageService: MessageService
  ) {

    this.studentQueryForm = new FormGroup({
      studentName : new FormControl(),
      fatherName : new FormControl(null),
      motherName : new FormControl(null),
      address : new FormControl(null),
      guardianName : new FormControl(null),
      relationToGuardian : new FormControl(null,[Validators.required]),
      educationalInstitution : new FormControl(null,[Validators.required]),
      phoneNumber : new FormControl(null,[Validators.required]),
      query : new FormControl(null,[Validators.required])
    });
  }

  ngOnInit(): void {
  }
  showSuccess(successMessage: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: successMessage});
  }
  showError(message: string) {
    this.messageService.add({severity:'error', summary: 'Success', detail: message});
  }
  saveQuery(){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.queryData.student_name = this.studentQueryForm.value.student_name;
        this.queryData.address = this.studentQueryForm.value.student_name;
        this.queryData.father_name = this.studentQueryForm.value.student_name;
        this.queryData.mother_name = this.studentQueryForm.value.student_name;
        this.queryData.guardian_name = this.studentQueryForm.value.student_name;
        this.queryData.relation_to_guardian = this.studentQueryForm.value.student_name;
        this.queryData.educational_institution = this.studentQueryForm.value.student_name;
        this.queryData.phone_number = this.studentQueryForm.value.student_name;
        this.queryData.query = this.studentQueryForm.value.student_name;

        this.studentQueryService.saveStudentQuery(this.queryData).subscribe(response => {
          if (response.status === true){
            this.showSuccess("Record added successfully");
          }
        }, error=>{
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

}
