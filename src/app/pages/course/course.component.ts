import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {StorageMap} from "@ngx-pwa/local-storage";
import {ConfirmationService, MenuItem, MessageService, PrimeNGConfig} from "primeng/api";
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [ConfirmationService, MessageService]

})

export class CourseComponent implements OnInit {
  dialogContent: string = "";
  displayDialog: boolean = false;
  isLinear: boolean = false;
  visibleSidebar2: boolean = false;
  courses: Course[] = [];
  constructor(private route: ActivatedRoute
    ,public authService: AuthService
    , private messageService: MessageService
    , private activatedRoute: ActivatedRoute
    , private courseService: CourseService
    , private primengConfig: PrimeNGConfig
    , private storage: StorageMap
    , private commonService: CommonService
    ) { }
  //courseNameFormGroup: FormGroup = new FormGroup;
  ngOnInit(): void {

    this.courses = this.courseService.getCourses();
    this.courseService.getCourseUpdateListener().subscribe((response: Course[]) =>{
      this.courses = response;
    });
    this.courseService.fetchAllCourses().subscribe((response:any)=>{
         this.courses=response.data;
         console.log("Course List:",this.courses);
      })
   
  }
  courseNameFormGroup = new FormGroup({
    durationTypeId : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    fullName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    courseCode : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]),
    shortName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    courseDuration : new FormControl(),
    description : new FormControl()
  })
}
