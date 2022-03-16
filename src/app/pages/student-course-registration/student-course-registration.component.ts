import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-course-registration',
  templateUrl: './student-course-registration.component.html',
  styleUrls: ['./student-course-registration.component.scss']
})

export class StudentCourseRegistrationComponent implements OnInit {
  ledger_id: any[] = [];
  course_id: any[]= [];
  
  constructor() { }
  //studentToCourseFormGroup: FormGroup | undefined ;
  ngOnInit(): void {
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
    course_id : new FormControl(1, [Validators.required])
  }) 

}
