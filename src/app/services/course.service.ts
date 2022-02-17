import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Course } from '../models/course.model';
import { CommonService } from './common.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseList: Course[] =[];
  courseSubject = new Subject<Course[]>();
  constructor(private commonService: CommonService, private errorService: ErrorService, private http: HttpClient) { }

  fetchAllCourses(){
    return this.http.get<any>(this.commonService.getAPI() + '/courses')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: Course[]}) => {
      this.courseList=response.data;
      /* console.log("courseList:",this.courseList); */
      this.courseSubject.next([...this.courseList]);
    })));
  }

  getCourses(){
    return [...this.courseList];
  }
  getCourseUpdateListener(){
    return this.courseSubject.asObservable();
  }
}
