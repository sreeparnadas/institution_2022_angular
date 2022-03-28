import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {ConfirmationService, MenuItem, MessageService, PrimeNGConfig} from "primeng/api";
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { Student } from 'src/app/models/student.model';
import { StudentToCourseService } from 'src/app/services/student-to-course.service';
import { StudentService } from 'src/app/services/student.service';

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
 
  constructor(private studentToCourseService: StudentToCourseService,
    private studentService: StudentService, 
    private activatedRoute: ActivatedRoute) 
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

  saveStudentToCourse(){

  }
  updateStudentToCourse(){
    
  }
  clearStudentToCourse(){

  }
}
