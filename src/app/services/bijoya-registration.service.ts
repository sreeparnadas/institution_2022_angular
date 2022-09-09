import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { CommonService } from './common.service';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class BijoyaRegistrationService {

  constructor( private http: HttpClient, private commonService: CommonService,  private errorService: ErrorService,) {

  }

  saveStudentInfo(studentData: any){
    return this.http.post<any>(this.commonService.getAPI() + '/dev/bijoyaRegistrationForm', studentData)
    .pipe(catchError(this.errorService.serverError), tap(response =>{
      console.log(response);
    }))
  }

  
}
