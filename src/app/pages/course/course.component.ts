import { Component, OnInit } from '@angular/core';
import { FormControl,UntypedFormControl, FormGroup,UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {StorageMap} from "@ngx-pwa/local-storage";
import {ConfirmationService, MenuItem, MessageService, PrimeNGConfig} from "primeng/api";
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { CourseService } from 'src/app/services/course.service';
import {Table} from "primeng/table";
import * as FileSaver from "file-saver";


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
  totalNoCourse:number=0;
  totalMonthlyCourse:number=0;
  totalFullCourse:number=0;
  isShown: boolean = false ; // hidden by default
  hiddenInput: boolean = false ;
  showErrorMessage: boolean = false;
  displayDialog: boolean = false;
  isLinear: boolean = false;
  event:any;
  feesModeTypeId:any;
  visibleSidebar2: boolean = false;
  courses: Course[] = [];
  durationTypes: any[]=[];
  feeModeType: any[] = [];
  courseData!:object ;

  msgs: { severity: string; summary: string; detail: string }[] = [];
  /* courseData: {
    courseId?:number;
    feesModeTypeId?:number;
    durationTypeId?: number;
    fullName?: string;
    courseCode?: string;
    shortName?: string;
    courseDuration?: string;
    description?: string;
  }={}; */

  constructor(public authService: AuthService
    , private messageService: MessageService
    , private activatedRoute: ActivatedRoute
    , private courseService: CourseService
    ,private confirmationService: ConfirmationService
    , private primengConfig: PrimeNGConfig
    , private storage: StorageMap
    , private commonService: CommonService
    ) {

    this.activatedRoute.data.subscribe((response: any) => {
      this.courses = response.courseResolverData.courses.data;
      this.durationTypes = response.courseResolverData.durationTypes.data;
    });
  }

  ngOnInit(): void {

    // this.courses = this.courseService.getCourses();
    this.courseService.getCourseUpdateListener().subscribe((response: Course[]) =>{
      this.courses = response;
    });
     this.feeModeType = [
      {value:1, name: 'Monthly'},
      {value:2, name: 'Single'}
    ];

  this.getTotalCourse();
  this.getMonthlyTotalCourse();
  this.getFullTotalCourse();
  }
  active=0;
  selectedIndex=0
  onTabChanged(event:any){
    console.log(event)
  }
  getTotalCourse(){
    this.courseService.fetchAllTotalCourse().subscribe(response => {
      this.totalNoCourse = response.data[0].totalCourse;
      console.log("Monthly totalNoCourse:",this.totalNoCourse);
    })
  }
  getMonthlyTotalCourse(){
    this.courseService.fetchMonthlyTotalCourse().subscribe(response => {
      this.totalMonthlyCourse = response.data[0].totalMonthlyCourse;
      console.log("Monthly totalMonthlyCourse:",this.totalMonthlyCourse);
    })
  }
  getFullTotalCourse(){
    this.courseService.fetchFullTotalCourse().subscribe(response => {
      this.totalFullCourse = response.data[0].totalFullCourse;
      console.log("Monthly totalFullCourse:",this.totalFullCourse);
    })
  }
  courseNameFormGroup = new FormGroup({
    feesModeTypeId : new FormControl(1, [Validators.required]),
    durationTypeId : new FormControl(2, [Validators.required]),
    fullName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
    courseCode : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]),
    shortName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
    courseDuration : new FormControl(),
    description : new FormControl(),
    courseId : new FormControl()
  })
  loading: boolean = false;
  deleteCourse(courseData:any){
    this.confirmationService.confirm({
      message: 'Do you want to Update this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        //const index: number = this.myArray.indexOf(value);
        //this.myArray.splice(index, 1);
      
        //const index: number = this.courses.indexOf(courseData.courseId);

        let index = this.courses.findIndex(x => x.courseId === courseData.courseId);
        
        console.log("Array: ",this.courses);
        console.log("courseData: ",courseData.courseId);
          this.courseService.deleteCourse(courseData.courseId).subscribe(response => {
           
            console.log("index...1:",response.success);
            if (index != -1) {
              
              this.courses.splice(index, 1);
              console.log("index...",index);
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
  updateCourse(){

    this.confirmationService.confirm({
      message: 'Do you want to Update this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
       /*  this.courseData.courseId=this.courseNameFormGroup.value.courseId;
        this.courseData.feesModeTypeId=this.courseNameFormGroup.value.feesModeTypeId;
        this.courseData.durationTypeId=this.courseNameFormGroup.value.durationTypeId;
        this.courseData.fullName=this.courseNameFormGroup.value.fullName;
        this.courseData.courseCode=this.courseNameFormGroup.value.courseCode;
        this.courseData.shortName=this.courseNameFormGroup.value.shortName;
        this.courseData.courseDuration=this.courseNameFormGroup.value.courseDuration;
        this.courseData.description=this.courseNameFormGroup.value.description; */
        this.courseData= {
          courseId:this.courseNameFormGroup.value.courseId,
          feesModeTypeId:this.courseNameFormGroup.value.feesModeTypeId,
          durationTypeId: this.courseNameFormGroup.value.durationTypeId,
          fullName: this.courseNameFormGroup.value.fullName,
          courseCode: this.courseNameFormGroup.value.courseCode,
          shortName: this.courseNameFormGroup.value.shortName,
          courseDuration: this.courseNameFormGroup.value.courseDuration,
          description: this.courseNameFormGroup.value.description
        }
        this.courseService.updateCourse(this.courseData).subscribe(response => {

          if (response.status === true){
            this.showSuccess("Record Updated successfully");
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
  saveCourse(){
    //alert("Testing");

    this.confirmationService.confirm({
      message: 'Do you want to Save this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
       /*  this.courseData.feesModeTypeId=this.courseNameFormGroup.value.feesModeTypeId;
        this.courseData.durationTypeId=this.courseNameFormGroup.value.durationTypeId;
        this.courseData.fullName=this.courseNameFormGroup.value.fullName;
        this.courseData.courseCode=this.courseNameFormGroup.value.courseCode;
        this.courseData.shortName=this.courseNameFormGroup.value.shortName;
        this.courseData.courseDuration=this.courseNameFormGroup.value.courseDuration;
        this.courseData.description=this.courseNameFormGroup.value.description; */
        this.courseData= {
          courseId:this.courseNameFormGroup.value.courseId,
          feesModeTypeId:this.courseNameFormGroup.value.feesModeTypeId,
          durationTypeId: this.courseNameFormGroup.value.durationTypeId,
          fullName: this.courseNameFormGroup.value.fullName,
          courseCode: this.courseNameFormGroup.value.courseCode,
          shortName: this.courseNameFormGroup.value.shortName,
          courseDuration: this.courseNameFormGroup.value.courseDuration,
          description: this.courseNameFormGroup.value.description
        }
        this.courseService.saveCourse(this.courseData).subscribe(response => {
          
          if (response.success === 1){
            this.showSuccess("Record added successfully");
            this.clearCourse();
            this.getTotalCourse();
            this.getMonthlyTotalCourse();
            this.getFullTotalCourse();
            console.log("success:",response.success);
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
  clearCourse(){
    this.isShown = false;
    //this.courseNameFormGroup.reset();
    this.courseNameFormGroup = new FormGroup({
      feesModeTypeId : new FormControl(1, [Validators.required]),
      durationTypeId : new FormControl(2, [Validators.required]),
      fullName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(5)]),
      courseCode : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]),
      shortName : new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.minLength(3)]),
      courseDuration : new FormControl(),
      description : new FormControl(),
      courseId : new FormControl()
    });
  }
  editCourse(courseData:any){
    //this.isShown = true;
    this.selectedIndex=0
    this.event=0;
    this.onTabChanged(this.event);
    console.log(courseData);
    this.isShown = true;
    this.courseNameFormGroup.patchValue({courseId: courseData.courseId});
    this.courseNameFormGroup.patchValue({feesModeTypeId: courseData.feesModeType.feesModeTypeId});
    this.courseNameFormGroup.patchValue({durationTypeId: courseData.durationTypeId});

    this.courseNameFormGroup.patchValue({fullName: courseData.fullName});
    this.courseNameFormGroup.patchValue({courseCode: courseData.courseCode});

    this.courseNameFormGroup.patchValue({shortName: courseData.shortName});
    this.courseNameFormGroup.patchValue({courseDuration: courseData.courseDuration});
    this.courseNameFormGroup.patchValue({description: courseData.description});
    console.log(courseData);
  }
  showSuccess(successMessage: string) {
    this.messageService.add({severity:'success', summary: 'Success', detail: successMessage});
  }
  showError(message: string) {
    this.messageService.add({severity:'error', summary: 'Success', detail: message});
  }
  clear(table: Table) {
    table.clear();
  }
  cols: any[] = [
    {field: 'courseId',header: 'Course ID', customExportHeader: 'Course Code'},
    {field: 'courseCode'},
    {field: 'shortName'},
    {field: 'fullName'},
    {field: 'courseDuration'},
    {field: 'description'}
  ];

  getEventValue($event:any) :string {
    return $event.target.value;
  }

  applyFilterGlobal($event: any, stringVal: any, dt: any) {
    dt!.filterGlobal(($event.target as HTMLInputElement).value, 'contains');
  }
  
  selectedCourses: any;
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.courses);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "products");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
