import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ConfirmationService, MenuItem, MessageService, PrimeNGConfig} from "primeng/api";
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { StudentToCourseService } from 'src/app/services/student-to-course.service';
import { StudentService } from 'src/app/services/student.service';
import { CommonService } from 'src/app/services/common.service';

interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.scss'],
  providers: [ConfirmationService, MessageService]
})

export class StudentCourseRegistrationComponent implements OnInit {
  //studentList: Student[] =[];
  isShown: boolean = false ; // hidden by default
  students: any[] = [];
  courses: Course[] = [];
  durationTypes: any[]=[];
  //courses: Course[] = [];
  ledger_id: any[] = [];
  course_id: any[]= [];

  studentTocourseData: {
    reference_number?:number;
    studentId?:number;
			courseId?:number;
			baseFee?:number;
			discountAllowed?:number;
			joiningDate?: string;
			effectiveDate?: string;
			actual_course_duration?:number;
			duration_type_id?:number;
      isStarted?:number;
  }={};
  showErrorMessage: boolean | undefined;
  errorMessage: any;
  msgs: { severity: string; summary: string; detail: string; }[] | undefined;
 
  constructor(private studentToCourseService: StudentToCourseService,
    private studentService: StudentService, 
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private commonService: CommonService) 
    {
      this.activatedRoute.data.subscribe((response: any) => {
        console.log(response);
        this.students = response.studentCourseRegistrationResolverData.students.data;
        this.durationTypes = response.studentCourseRegistrationResolverData.durationTypes.data;
        this.courses = response.studentCourseRegistrationResolverData.courses.data;
      });
     }
  //studentToCourseFormGroup: FormGroup | undefined ;
  ngOnInit(): void {

    
    
    this.studentService.getStudentUpdateListener().subscribe((response: Student[]) =>{
      this.students = response;
      console.log("Student list:",this.students);
    });
   
    this.ledger_id = [
      {value:1, name: 'Nanda Gopal Sutradhar'},
      {value:2, name: 'Sukanta HUi'}
    ];
    this.course_id = [
      {value:1, name: 'CCIT'},
      {value:2, name: 'DCA'}
    ];
  }

   studentToCourseFormGroup = new FormGroup({
    ledger_id : new FormControl(1, [Validators.required]),
    course_id : new FormControl(1, [Validators.required]),
    base_fee : new FormControl(null, [Validators.required]),
    discount_allowed : new FormControl(null, [Validators.required]),
    joining_date : new FormControl(null, [Validators.required]),
    effective_date : new FormControl(null, [Validators.required]),
    actual_course_duration : new FormControl(null, [Validators.required]),
    duration_type_id : new FormControl(1, [Validators.required])
  }) 
  setEffectiveSQL(value: string) {
    this.studentToCourseFormGroup.patchValue({effective_date: this.commonService.getSQLDate(value)});
  }
  setJoiningSQL(value: string) {
    this.studentToCourseFormGroup.patchValue({joining_date: this.commonService.getSQLDate(value)});
  }
  saveStudentToCourse(){
 //alert("Testing");

 this.confirmationService.confirm({
  message: 'Do you want to Save this record?',
  header: 'Delete Confirmation',
  icon: 'pi pi-info-circle',
  accept: () => {
    this.studentTocourseData.studentId=this.studentToCourseFormGroup.value.ledger_id;
    this.studentTocourseData.courseId=this.studentToCourseFormGroup.value.course_id;
    this.studentTocourseData.baseFee=this.studentToCourseFormGroup.value.base_fee;
    this.studentTocourseData.discountAllowed=this.studentToCourseFormGroup.value.discount_allowed;
    this.studentTocourseData.joiningDate=this.studentToCourseFormGroup.value.joining_date;
    this.studentTocourseData.effectiveDate=this.studentToCourseFormGroup.value.effective_date;
    this.studentTocourseData.actual_course_duration=this.studentToCourseFormGroup.value.actual_course_duration;
    this.studentTocourseData.duration_type_id=this.studentToCourseFormGroup.value.duration_type_id;
    this.studentTocourseData.isStarted=1;
    this.studentToCourseService.saveStudentToCourse(this.studentTocourseData).subscribe(response => {

      if (response.status === true){
        this.showSuccess("Record added successfully");
      }

    },error=>{
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
  showError(statusText: any) {
    throw new Error('Method not implemented.');
  }
  showSuccess(arg0: string) {
    throw new Error('Method not implemented.');
  }
  
  updateStudentToCourse(){
    
  }
  clearStudentToCourse(){

  }
}
