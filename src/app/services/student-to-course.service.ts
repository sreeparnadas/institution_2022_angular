import { Injectable } from '@angular/core';
import { StudentToCourse } from '../models/studenttocourse.model';
import { Course } from '../models/course.model';
import { catchError, Subject, tap } from 'rxjs';
import { CommonService } from './common.service';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentToCourseService {
  studentList: Student[] =[];
  courseList: Course[] =[];
  studentToCourseList: StudentToCourse[] =[];
  durationTypeList: any[] =[];
  studentToCourseSubject = new Subject<StudentToCourse[]>();
  durationTypeSubject = new Subject<Course[]>();
  studentSubject = new Subject<Student[]>();
  //studentSubject: any;
  courseSubject: any;
  constructor(private commonService: CommonService, private errorService: ErrorService, private http: HttpClient) { }
  

  fetchAllDurationType(){
    return this.http.get<any>(this.commonService.getAPI() + '/durationTypes')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.durationTypeList=response.data;
      this.durationTypeSubject.next([...this.durationTypeList]);
    })));
  }
 /*  fetchAllStudents(){
    return this.http.get<any>(this.commonService.getAPI() + '/students')
      .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: Student[]}) => {
        this.studentList=response.data;
        console.log(this.studentList);
        this.studentSubject.next([...this.studentList]);
      })));
  } */
  /* getStudentToCourseUpdateListener(){
    return this.studentSubject.asObservable();
  } */

  fetchAllCourses(){
    return this.http.get<any>(this.commonService.getAPI() + '/courses')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: Course[]}) => {
      this.courseList=response.data;
      /* console.log("courseList:",this.courseList); */
      this.courseSubject.next([...this.courseList]);
    })));
  }
  fetchAllStudentToCourses(){
    return this.http.get<any>(this.commonService.getAPI() + '/studentCourseRegistrations')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      /* console.log("courseList:",this.courseList); */
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }

  getStudentToCourses(){
    return [...this.studentToCourseList];
  }
}