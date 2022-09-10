import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { ConfirmationService } from 'primeng/api';
import { BijoyaRegistrationService } from 'src/app/services/bijoya-registration.service';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BijoyaRegistration } from 'src/app/models/bijoya-regitration.model';


@Component({
  selector: 'app-bijoya-registration',
  templateUrl: './bijoya-registration.component.html',
  styleUrls: ['./bijoya-registration.component.scss']
})
export class BijoyaRegistrationComponent implements OnInit {

  studentData: {

    studentId?: number;
    studentName?: string;
    email?: string;
    contactNumber?: string;
    whatsappNumber?: string;
    telegramNumber?: string;
    memberNumber?: number
  } = {};

  studentInfo: BijoyaRegistration[]=[];
  studentInfoFormGroup = new UntypedFormGroup({
    student_name: new UntypedFormControl(null, [Validators.required]),
    email: new UntypedFormControl(null),
    contact_number: new UntypedFormControl(null, [Validators.required, Validators.minLength(12)]),
    whatsapp_number: new UntypedFormControl(null, [ Validators.minLength(10)]),
    telegram_number: new UntypedFormControl(null, [ Validators.minLength(10)]),
    member_number: new UntypedFormControl(1,[Validators.required]),
  });


  constructor(
    // private confirmationService: ConfirmationService,
    private bijoyaRegistrationService: BijoyaRegistrationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.data.subscribe((response: any) => {

    });
  }

  ngOnInit(): void {

    this.bijoyaRegistrationService.saveStudentInfo(this.studentData);
  }
  

  saveStudent() {

    // console.log(this.studentInfoFormGroup.value);

    this.studentData.studentName = this.studentInfoFormGroup.value.student_name;
    this.studentData.email = this.studentInfoFormGroup.value.email;
    this.studentData.contactNumber = this.studentInfoFormGroup.value.contact_number;
    this.studentData.whatsappNumber = this.studentInfoFormGroup.value.whatsapp_number;
    this.studentData.telegramNumber = this.studentInfoFormGroup.value.telegram_number;
    this.studentData.memberNumber = this.studentInfoFormGroup.value.member_number;
    // console.log(this.studentData);


    this.bijoyaRegistrationService.saveStudentInfo(this.studentData).subscribe((response=>{
      console.log(response.data);
    }));
  }

}
