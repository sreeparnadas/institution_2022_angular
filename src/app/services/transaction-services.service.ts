import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { Subject } from 'rxjs/internal/Subject';
import { tap } from 'rxjs';
import { StudentToCourse } from '../models/studenttocourse.model';
import { CommonService } from './common.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionServicesService {
  studentToCourseList: StudentToCourse[] =[];
  feesNameList:any[]=[];
  studentNameList:any[]=[];
  feesReceivedList:any[]=[];
  transactionList:any[]=[];
  //feesReceivedList:any[]=[];
  studentToCourseSubject = new Subject<StudentToCourse[]>();
  feesNameSubject = new Subject<any[]>();
  studentNameSubject = new Subject<any[]>();
  feesReceivedSubject = new Subject<any[]>();
  transactionListSubject = new Subject<any[]>();
  constructor(private commonService: CommonService, private errorService: ErrorService, private http: HttpClient) {


  }

  fetchAllReceipt($id: any){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/getAllReceiptId/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.feesReceivedList=response.data;
      this.feesReceivedSubject.next([...this.feesReceivedList]);
    })));
  }
  fetchSingleReceipt($id: any){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/getReceiptId/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.feesReceivedList=response.data;
      this.feesReceivedSubject.next([...this.feesReceivedList]);
    })));
  }
  fetchAllStudentToCourses($id: any){
    //return this.http.get<any>(this.commonService.getAPI() + '/students/studentId/'+$id+'/courses')
    return this.http.get<any>(this.commonService.getAPI() + '/students/studentToCourses/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }

  fetchAllFeesName(){
    return this.http.get<any>(this.commonService.getAPI() + '/students/feesName')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      // this.feesNameList=response.data;
      // this.feesNameSubject.next([...this.feesNameList]);
    })));
  }
  fetchDiscountFeesName(){
    return this.http.get<any>(this.commonService.getAPI() + '/students/feesNameDiscount')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      // this.feesNameList=response.data;
      // this.feesNameSubject.next([...this.feesNameList]);
    })));
  }
  fetchAllStudentName(){
    return this.http.get<any>(this.commonService.getAPI() + '/students')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      // this.studentNameList=response.data;
      // this.studentNameSubject.next([...this.studentNameList]);
    })));
  }
  fetchAllCourseName(){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/feesName')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.feesNameList=response.data;
      this.feesNameSubject.next([...this.feesNameList]);
    })));
  }

  fetchAllFeesCharged(){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/allFeesCharged')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.feesReceivedList=response.data;
      this.feesReceivedSubject.next([...this.feesReceivedList]);
    })));
  }
  fetchAllFeesDiscount(){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/allFeesDiscount')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.feesReceivedList=response.data;
      this.feesReceivedSubject.next([...this.feesReceivedList]);
    })));
  }
  fetchAllFeesReceived(){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/allFeesReceived')
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.feesReceivedList=response.data;
      this.feesReceivedSubject.next([...this.feesReceivedList]);
    })));
  }
  fetchAllTransaction($id:any){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/getFeeCharge/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: any[]}) => {
      this.transactionList=response.data;
      this.transactionListSubject.next([...this.transactionList]);
    })));
  }
  fetchAllActiveCourse(data:any){
    return this.http.post<any>(this.commonService.getAPI() + '/getRegisterCourseByStudentId', data)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      console.log("Student to courseList:",this.studentToCourseList);
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }
  fetchCourseId($id:any){
    return this.http.get<any>(this.commonService.getAPI() + '/getCourseId/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      console.log("Student to courseList:",this.studentToCourseList);
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }
  feesCharge(feeChargeData:any){
    return this.http.post<any>(this.commonService.getAPI() + '/transactions/feesCharged', feeChargeData)
    .pipe(catchError(this.errorService.serverError), tap(response => {
      if (response.status === true){
        this.studentToCourseList.unshift(response.data);
        this.studentToCourseSubject.next([...this.studentToCourseList]);
      }
    }))
  }

  feesDiscountCharge(feeChargeData:any){
    return this.http.post<any>(this.commonService.getAPI() + '/transactions/feesDiscountCharged', feeChargeData)
    .pipe(catchError(this.errorService.serverError), tap(response => {
      if (response.status === true){
        this.studentToCourseList.unshift(response.data);
        this.studentToCourseSubject.next([...this.studentToCourseList]);
      }
    }))
  }
  saveFeesReceive(feeReceivedData:any){
    return this.http.post<any>(this.commonService.getAPI() + '/transactions/feesReceived', feeReceivedData)
    .pipe(catchError(this.errorService.serverError), tap(response => {
      if (response.status === true){
        this.studentToCourseList.unshift(response.data);
        this.studentToCourseSubject.next([...this.studentToCourseList]);
      }
    }))
  }

  updateFeesCharge(id:any,updateFeeReceivedData:any){
    return this.http.patch<any>(this.commonService.getAPI() + '/transactions/updateFeesCharged/' +id, updateFeeReceivedData)
    .pipe(catchError(this.errorService.serverError), tap(response => {
      if (response.status === true){
        this.studentToCourseList.unshift(response.data);
        this.studentToCourseSubject.next([...this.studentToCourseList]);
      }
    }))
  }

  fetchFeesChargeDetailsById($id:any){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/feesChargedDetailsMain/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      console.log("Fees Course Details:",this.studentToCourseList);
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }

  //----------------- Fees Received Function start -----------------------
  fetchFeesDueListId($id:any){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/feesDueListByTranId/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      //console.log("Fees Due List:",this.studentToCourseList);
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }
 
  fetchAllTranMasterId($id:any){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/getTranMasterId/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      //console.log("Fees Due List:",this.studentToCourseList);
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }

  fetchDiscountByTranId($id:any){
    return this.http.get<any>(this.commonService.getAPI() + '/transactions/allTotalDiscountByTranId/'+$id)
    .pipe(catchError(this.errorService.serverError), tap(response => {
      if (response.status === true){
        this.studentToCourseList.unshift(response.data);
        this.studentToCourseSubject.next([...this.studentToCourseList]);
      }
    }))
  }

  fetchFeesDueLedgerId(data:any){
     return this.http.post<any>(this.commonService.getAPI() + '/transactions/getFeesByLedgerId', data)
     .pipe(catchError(this.errorService.serverError), tap(((response: {success: number, data: StudentToCourse[]}) => {
      this.studentToCourseList=response.data;
      console.log("Due list By Ledger:",this.studentToCourseList);
      this.studentToCourseSubject.next([...this.studentToCourseList]);
    })));
  }
}
