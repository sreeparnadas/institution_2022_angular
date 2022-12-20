import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs';
import { StudentToCourse } from '../models/studenttocourse.model';
import { CommonService } from './common.service';
import { ErrorService } from './error.service';
@Injectable({
  providedIn: 'root'
})
export class ReportService {
  incomeReportList:any[]=[];

  incomeReportSubject = new Subject<any[]>();
  constructor(private commonService: CommonService, private errorService: ErrorService, private http: HttpClient) {


  }

  fetchAllReceiptIncomeReport(){
    return this.http.get<any>(this.commonService.getAPI() + '/getAllIncomeReport')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.incomeReportList=response.data;
      this.incomeReportSubject.next([...this.incomeReportList]);
      console.log("all Income:",this.incomeReportList);
    })));
  }
  fetchWorkingDaysReport(){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/workingDays')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.incomeReportList=response.data;
      this.incomeReportSubject.next([...this.incomeReportList]);
      //console.log("Working Days:",this.incomeReportList);
    })));
  }
  fetchStudentBirthDayDaysReport(){
    return this.http.get<any>(this.commonService.getAPI() + '/reportStudentBirthday')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.incomeReportList=response.data;
      //this.incomeReportSubject.next([...this.incomeReportList]);
      //console.log("Birthday List:",this.incomeReportList);
    })));
  }
}
