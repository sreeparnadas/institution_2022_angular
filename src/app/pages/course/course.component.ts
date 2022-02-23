import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {StorageMap} from "@ngx-pwa/local-storage";
import {ConfirmationService, MenuItem, MessageService, PrimeNGConfig} from "primeng/api";
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { CourseService } from 'src/app/services/course.service';

interface Alert {
  type: string;
  message: string;
}
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  providers: [ConfirmationService, MessageService]

})

export class CourseComponent implements OnInit {
  dialogContent: string = "";
  errorMessage: any;
  showErrorMessage: boolean = false;
  displayDialog: boolean = false;
  isLinear: boolean = false;
  visibleSidebar2: boolean = false;
  courses: Course[] = [];
  durationTypes: any[]=[];
  feeModeType: any[] = [];
  msgs: { severity: string; summary: string; detail: string }[] = [];
  courseData: {
    feesModeTypeId?:number;
    durationTypeId?: number;
    fullName?: string;
    courseCode?: string;
    shortName?: string;
    courseDuration?: string;
    description?: string;
  }={};

  constructor(private route: ActivatedRoute
    ,public authService: AuthService
    , private messageService: MessageService
    , private activatedRoute: ActivatedRoute
    , private courseService: CourseService
    ,private confirmationService: ConfirmationService
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

      this.courseService.fetchAllDurationType().subscribe((response:any)=>{
        this.durationTypes=response.data;
        console.log("Duration List:",this.durationTypes);
     })
     this.feeModeType = [
      {value:'1', name: 'Monthly'},
      {value:'2', name: 'Single'}
    ];
   
   
  }
  courseNameFormGroup = new FormGroup({
    feesModeTypeId : new FormControl(1, [Validators.required]),
    durationTypeId : new FormControl(1, [Validators.required]),
    fullName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    courseCode : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]),
    shortName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    courseDuration : new FormControl(),
    description : new FormControl()
  })

  saveCourse(){
    //alert("Testing");
    
    this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.courseData.feesModeTypeId=this.courseNameFormGroup.value.feesModeTypeId;
        this.courseData.durationTypeId=this.courseNameFormGroup.value.durationTypeId;
        this.courseData.fullName=this.courseNameFormGroup.value.fullName;
        this.courseData.courseCode=this.courseNameFormGroup.value.courseCode;
        this.courseData.shortName=this.courseNameFormGroup.value.shortName;
        this.courseData.courseDuration=this.courseNameFormGroup.value.courseDuration;
        this.courseData.description=this.courseNameFormGroup.value.description;
        
        this.courseService.saveCourse(this.courseData).subscribe(response => {

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
  editCourse(courseData:any){

    
    console.log("Editable data:",courseData.durationTypeId);
    //this.isShown = true;
    this.courseNameFormGroup.patchValue({feesModeTypeId: courseData.feesModeType.feesModeTypeId});
    this.courseNameFormGroup.patchValue({durationTypeId: courseData.durationTypeId});

    this.courseNameFormGroup.patchValue({fullName: courseData.fullName});
    this.courseNameFormGroup.patchValue({courseCode: courseData.courseCode});

    this.courseNameFormGroup.patchValue({shortName: courseData.shortName});
    this.courseNameFormGroup.patchValue({courseDuration: courseData.courseDuration});
    this.courseNameFormGroup.patchValue({description: courseData.description});


    //this.studentBasicFormGroup.patchValue({dob: this.datepipe.transform(studentData.dobSQL, 'yyyy-MM-dd')});

    

   /*  this.studentContactFormGroup.patchValue({guardianContactNumber: studentData.guardianContactNumber});
    this.studentContactFormGroup.patchValue({whatsappNumber: studentData.whatsappNumber});
    this.studentContactFormGroup.patchValue({email: studentData.email});
    this.studentContactFormGroup.patchValue({description: studentData.description}); */
  }
  showSuccess(successMessage: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: successMessage});
  }
  showError(message: string) {
    this.messageService.add({severity:'error', summary: 'Success', detail: message});
  }
}
